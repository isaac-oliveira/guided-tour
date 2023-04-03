import { useGuided } from '@guided-tour/core';
import React, { useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';

import { ScrollContext } from '../contexts';
import { TooltipPosition } from '../helpers';

import type { GuidedControllerProps, Measure, Dimensions } from '../@types';
import Animated, { runOnJS, withTiming, useSharedValue, useAnimatedStyle, withDelay, withSequence, withRepeat } from 'react-native-reanimated';

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
        lastComponentMeasure,
        setLastComponentMeasure,
        lastTooltipPosition,
        setLastTooltipPosition,
        ...rest
    } = useGuided({
        previousName,
        nextName
    });

    const [isDragging, setIsDragging] = useState<boolean | null>(null);
    const [measure, setMeasure] = useState<Measure | null>(lastComponentMeasure || null);
    const [dimensions, setDimensions] = useState<Dimensions | null>(null);

    const measureLeft = useSharedValue(measure?.left || 0);
    const measureTop = useSharedValue(measure?.top || 0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
        left: measureLeft.value,
        top: measureTop.value
        };
    });

    const runAnimation = (left?: number, top?: number) => {
        (left || top) ? (
            measureLeft.value = withRepeat(withSequence(
                withTiming(left || 0),
                withDelay(5, withTiming(measure?.left || 0))
            ), 20),
            measureTop.value = withRepeat(withSequence(
                withTiming(top || 0),
                withDelay(5, withTiming(measure?.top || 0))
            ), 20),
            measureLeft.value = withTiming(left || measure?.left || 0),
            measureTop.value = withTiming(top || measure?.top || 0)
        ) : (
            measureLeft.value = withTiming(left || measure?.left || 0, {duration: 400}),
            measureTop.value = withTiming(top || measure?.top || 0, {duration: 400})
        )
        setLastComponentMeasure(measure)
    };


    const { containerRef } = useContext(ScrollContext);

    const { anchor = 'top_center' } = tooltipData;

    const tooltipPosition = useMemo(() => {
        const getTooltipPostion = TooltipPosition[anchor];
        if (!getTooltipPostion) {
            return { left: 0, top: 0 };
        }
        const { left, top } = getTooltipPostion(measure, dimensions);
        
        /*Animated.timing( animationTooltip , {
            toValue: { x: left || 0, y: top || 0},
            duration: 50,
            delay: 20,
            useNativeDriver: false
        }).start()*/
        setLastTooltipPosition({ left, top })
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
                (left, top) => {
                    runAnimation(left, top)
                    scrollControl?.onChangeScroll({
                        x: left, y: top
                    });
                },
                () => {}
            );
        }
    };

    useLayoutEffect(() => {
        runAnimation()
    }, [tooltipPosition])

    const loadMeasureInWindow = () => {
        ref.current?.measureInWindow((left, top, width, height) => {
            setMeasure({
                left,
                top,
                width,
                height
            });
        });
        runAnimation();
    };

    const onLayoutComponent = () => {
        if (isDragging === null && scrollControl === undefined) {
            runOnJS(loadMeasureInWindow)();
            setIsDragging(false);
            return;
        }
        setIsDragging(!!scrollControl);
        runOnJS(loadMeasureLayout)();
        setTimeout(
            () => {
                runOnJS(loadMeasureInWindow)();
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
                visible={true}
                animationType="none"
                statusBarTranslucent
                onDismiss={() => setModalVisibily(false)}
                transparent
            >
                {welcomeData && renderWelcome && isStartGuide ? (
                    renderWelcome({ closeWelcome, close, data: welcomeData })
                ) : (
                    <View style={styles.container}>
                        <Animated.View
                            onLayout={onLayoutComponent}
                            style={[
                                styles.componentContainer,
                                animatedStyles
                            ]}
                        >
                            {renderComponent()}
                        </Animated.View>
                        <Pressable
                            style={styles.pressable}
                            onPress={() => {}}
                        />
                        <Animated.View
                            onLayout={onLayoutTooltip}
                            style={[
                                styles.tooltipContainer,
                                //animationTooltip.getLayout()
                            ]}
                        >
                            {renderTooltip &&
                                renderTooltip({
                                    data: tooltipData,
                                    current,
                                    close,
                                    ...rest
                                })}
                        </Animated.View>
                    </View>
                )}
            </Modal>
        </>
    );
};

const getStyles = ({
    insets,
    focused,
    measure,
    dimensions,
    tooltipPosition
}: any) => {
    const isVisible = focused && measure && dimensions;
    return StyleSheet.create({
        container: {
            flex: 1
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
        },
        moveLeft: {
            alignSelf: 'flex-start'
        },
        moveRight: {
            alignSelf: 'flex-end'
        }
    });
};

export { GuidedComponent };
