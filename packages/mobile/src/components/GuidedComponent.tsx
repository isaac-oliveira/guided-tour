import { useGuided } from '@guided-tour/core';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';

import { ScrollContext } from '../contexts';
import { TooltipPosition } from '../helpers';

import type { GuidedControllerProps, Measure, Dimensions } from '../@types';

type GuidedComponentProps = Omit<GuidedControllerProps, 'name'> & {
    focused: boolean;
};

const GuidedComponent = ({
    renderComponent,
    focused,
    scrollControl,
    previousName,
    nextName,
    tooltipData
}: GuidedComponentProps) => {
    const ref = useRef<View>(null);
    const [modalVisibily, setModalVisibily] = useState<boolean>(false);

    const {
        current,
        backgroundColor,
        insets,
        renderTooltip,
        closeWelcome,
        isStartGuide,
        renderWelcome,
        close,
        welcomeData,
        ...rest
    } = useGuided({
        previousName,
        nextName
    });

    useEffect(() => {
        setModalVisibily(focused);
    }, [focused]);

    const [isDragging, setIsDragging] = useState<boolean | null>(null);
    const [measure, setMeasure] = useState<Measure | null>(null);
    const [dimensions, setDimensions] = useState<Dimensions | null>(null);

    const { containerRef } = useContext(ScrollContext);

    const { anchor = 'top_center' } = tooltipData;

    const tooltipPosition = useMemo(() => {
        const getTooltipPostion = TooltipPosition[anchor];
        if (!getTooltipPostion) {
            return { left: 0, top: 0 };
        }
        const { left, top } = getTooltipPostion(measure, dimensions);
        return { left, top };
    }, [measure, dimensions]);

    const styles = getStyles({
        focused,
        backgroundColor,
        isDragging,
        insets,
        measure,
        dimensions,
        tooltipPosition
    });

    const loadMeasureLayout = () => {
        if (containerRef.current) {
            ref.current?.measureLayout(
                containerRef.current,
                (x, y) => {
                    scrollControl?.onChangeScroll({
                        x,
                        y
                    });
                },
                () => {}
            );
        }
    };

    const loadMeasureInWindow = () => {
        ref.current?.measureInWindow((left, top, width, height) => {
            setMeasure({
                left,
                top,
                width,
                height
            });
        });
    };

    const onLayoutComponent = () => {
        if (isDragging === null && scrollControl === undefined) {
            loadMeasureInWindow();
            setIsDragging(false);
            return;
        }
        setIsDragging(!!scrollControl);
        loadMeasureLayout();
        setTimeout(
            () => {
                loadMeasureInWindow();
                setTimeout(() => setIsDragging(false), 400);
            },
            scrollControl !== undefined ? 1000 : 0
        );
    };

    const onLayoutTooltip = ({ nativeEvent }: any) => {
        const { width, height } = nativeEvent.layout;
        setDimensions({ width, height });
    };

    return (
        <>
            {renderComponent(ref)}
            <Modal
                visible={modalVisibily}
                animationType="fade"
                statusBarTranslucent
                onDismiss={() => setModalVisibily(false)}
                transparent
            >
                {welcomeData && renderWelcome && isStartGuide ? (
                    renderWelcome({ closeWelcome, close, data: welcomeData })
                ) : (
                    <View style={styles.container}>
                        <View
                            onLayout={onLayoutComponent}
                            style={styles.componentContainer}
                        >
                            {renderComponent()}
                        </View>
                        <Pressable
                            style={styles.pressable}
                            onPress={() => {}}
                        />
                        <View
                            onLayout={onLayoutTooltip}
                            style={styles.tooltipContainer}
                        >
                            {renderTooltip &&
                                renderTooltip({
                                    data: tooltipData,
                                    current,
                                    close,
                                    ...rest
                                })}
                        </View>
                    </View>
                )}
            </Modal>
        </>
    );
};

const getStyles = ({
    insets,
    focused,
    backgroundColor,
    isDragging,
    measure,
    dimensions,
    tooltipPosition
}: any) => {
    const isVisible = focused && measure && dimensions && isDragging === false;
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: backgroundColor || '#0201017f'
        },
        componentContainer: {
            opacity: isVisible ? 1 : 0,
            top: Platform.select({
                android: (measure?.top || 0) + insets.top,
                default: measure?.top || 0
            }),
            left: measure?.left || 0,
            width: measure?.width,
            height: measure?.height
        },
        tooltipContainer: {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: isVisible ? 1 : 0,
            ...tooltipPosition,
            top: Platform.select({
                android: tooltipPosition.top + insets.top,
                default: tooltipPosition.top
            })
        },
        pressable: {
            position: 'absolute',
            height: '100%',
            width: '100%'
        }
    });
};

export { GuidedComponent };
