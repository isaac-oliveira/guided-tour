import React, { useCallback, useRef } from 'react';
import {
    Button,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View
} from 'react-native';
import { useGuidedTour } from '@guided-tour/core';
import {
    GuidedController,
    useScrollHandler,
    ScrollProvider
} from '@guided-tour/mobile';
import listData from '../mocks';

function FlatListScreen() {
    const flatRef = useRef<FlatList>(null);
    const { start } = useGuidedTour({
        initialName: 'header',
        welcomeData: { title: 'FlatList', description: 'qualquer coisa 2' },
        onClose: () => {
            console.log('Close FlatList');
        }
    });

    const { height } = useWindowDimensions();

    const { scrollControl } = useScrollHandler((position) => {
        flatRef.current?.scrollToOffset({
            offset: position.y - height / 2
        });
    }, []);

    const ListHeaderComponent = useCallback(() => {
        return (
            <GuidedController
                scrollControl={scrollControl}
                name="header"
                previousName={null}
                nextName="item1"
                tooltipData={{
                    title: 'Header',
                    description: 'Componente do header da flatlist',
                    anchor: 'bottom_center'
                }}
                renderComponent={(ref) => (
                    <View
                        ref={ref}
                        style={[styles.rect, { backgroundColor: '#f00' }]}
                    />
                )}
            />
        );
    }, [scrollControl]);

    const CellRendererComponent = useCallback(
        ({ children, index }) => {
            if (index !== 0) {
                return children;
            }
            return (
                <GuidedController
                    scrollControl={scrollControl}
                    name="item1"
                    previousName="header"
                    nextName="footer"
                    tooltipData={{
                        title: 'Item',
                        description: 'Componente do item da flatlist',
                        anchor: 'bottom_right'
                    }}
                    renderComponent={(ref) => (
                        <View ref={ref} style={{ backgroundColor: '#fff' }}>
                            {children}
                        </View>
                    )}
                />
            );
        },
        [scrollControl]
    );

    const renderItem = useCallback(({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
            </View>
        );
    }, []);

    const ListFooterComponent = useCallback(() => {
        return (
            <GuidedController
                scrollControl={scrollControl}
                name="footer"
                previousName="item1"
                nextName={null}
                tooltipData={{
                    title: 'Footer',
                    description: 'Componente do footer da flatlist',
                    anchor: 'top_center'
                }}
                renderComponent={(ref) => (
                    <View
                        ref={ref}
                        style={[styles.rect, { backgroundColor: '#00f' }]}
                    />
                )}
            />
        );
    }, [scrollControl]);

    return (
        <ScrollProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    ref={flatRef}
                    style={{ flex: 1 }}
                    data={listData}
                    keyExtractor={(item) => `item-${item.id}`}
                    CellRendererComponent={CellRendererComponent}
                    ListHeaderComponent={ListHeaderComponent}
                    ListFooterComponent={ListFooterComponent}
                    renderItem={renderItem}
                />
                <Button title="Start" onPress={start} />
            </SafeAreaView>
        </ScrollProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rect: {
        height: 150,
        width: 414,
        backgroundColor: '#ff0'
    },
    itemContainer: {
        padding: 10,
        width: 414,
        marginHorizontal: 20
    }
});

export default FlatListScreen;
