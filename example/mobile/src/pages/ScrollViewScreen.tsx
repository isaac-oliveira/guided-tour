import React, { useRef } from 'react';
import {
    Button,
    StyleSheet,
    ScrollView,
    View,
    useWindowDimensions,
    SafeAreaView
} from 'react-native';
import { useGuidedTour } from '@guided-tour/core';
import {
    GuidedController,
    ScrollProvider,
    useScrollHandler
} from '@guided-tour/mobile';

function ScrollViewScreen() {
    const scrollRef = useRef<ScrollView>(null);
    const { start } = useGuidedTour({
        initialName: 'item-1',
        onClose: () => {}
    });

    const { height } = useWindowDimensions();

    const { scrollControl } = useScrollHandler((position) => {
        scrollRef.current?.scrollTo({
            y: position.y - height / 2
        });
    }, []);

    return (
        <ScrollProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView ref={scrollRef} style={{ flex: 1 }}>
                    <GuidedController
                        scrollControl={scrollControl}
                        name="item-1"
                        previousName={null}
                        nextName="item-2"
                        tooltipData={{
                            title: 'Header',
                            description: 'Cabeçalho',
                            anchor: 'bottom_center'
                        }}
                        renderComponent={(ref) => (
                            <View
                                ref={ref}
                                style={[
                                    styles.header,
                                    { backgroundColor: '#68538F' }
                                ]}
                            />
                        )}
                    />
                    <View style={styles.rectContainer}>
                        <GuidedController
                            scrollControl={scrollControl}
                            name="item-2"
                            previousName="item-1"
                            nextName="item-3"
                            tooltipData={{
                                title: 'Item',
                                description: 'this is the item',
                                anchor: 'top_center'
                            }}
                            renderComponent={(ref) => (
                                <View
                                    ref={ref}
                                    style={[
                                        styles.rect,
                                        { backgroundColor: '#B2E7E8' }
                                    ]}
                                />
                            )}
                        />
                    </View>
                    <View style={styles.rectContainer}>
                        <GuidedController
                            scrollControl={scrollControl}
                            name="item-3"
                            previousName="item-2"
                            nextName="item-4"
                            tooltipData={{
                                title: 'Item',
                                description: 'this is the item',
                                anchor: 'top_center'
                            }}
                            renderComponent={(ref) => (
                                <View
                                    ref={ref}
                                    style={[
                                        styles.rect,
                                        { backgroundColor: '#8FB9AA' }
                                    ]}
                                />
                            )}
                        />
                    </View>
                    <View
                        style={[
                            styles.squareContainer,
                            { backgroundColor: '#FFF' }
                        ]}
                    >
                        <GuidedController
                            scrollControl={scrollControl}
                            name="item-4"
                            previousName="item-3"
                            nextName="item-5"
                            tooltipData={{
                                title: 'Item',
                                description: 'This is my item',
                                anchor: 'top_left'
                            }}
                            renderComponent={(ref) => (
                                <View ref={ref} style={styles.square} />
                            )}
                        />
                        <View style={styles.square} />
                        <View style={styles.square} />
                    </View>
                    <GuidedController
                        scrollControl={scrollControl}
                        name="item-5"
                        previousName="item-4"
                        nextName={null}
                        tooltipData={{
                            title: 'Footer',
                            description: 'Rodapé',
                            anchor: 'top_center'
                        }}
                        renderComponent={(ref) => (
                            <View
                                ref={ref}
                                style={[
                                    styles.header,
                                    { backgroundColor: '#68538F' }
                                ]}
                            />
                        )}
                    />
                </ScrollView>
                <Button title="Start" onPress={start} />
            </SafeAreaView>
        </ScrollProvider>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 240,
        width: 414
    },
    rectContainer: {
        marginVertical: 10
    },
    rect: {
        height: 150,
        width: 414
    },
    squareContainer: {
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-between'
    },
    square: {
        height: 100,
        width: 100,
        backgroundColor: '#ED8975'
    },
    itemContainer: {
        padding: 10,
        width: 414,
        marginHorizontal: 20
    }
});

export default ScrollViewScreen;
