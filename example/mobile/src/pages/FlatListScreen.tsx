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

const data = [
    { id: 1, title: 'Item 1', description: 'Description' },
    { id: 2, title: 'Item 2', description: 'Description' },
    { id: 3, title: 'Item 3', description: 'Description' },
    { id: 4, title: 'Item 4', description: 'Description' },
    { id: 5, title: 'Item 5', description: 'Description' },
    { id: 6, title: 'Item 6', description: 'Description' },
    { id: 7, title: 'Item 7', description: 'Description' },
    { id: 8, title: 'Item 8', description: 'Description' },
    { id: 9, title: 'Item 9', description: 'Description' },
    { id: 10, title: 'Item 10', description: 'Description' },
    { id: 11, title: 'Item 11', description: 'Description' },
    { id: 12, title: 'Item 12', description: 'Description' },
    { id: 13, title: 'Item 13', description: 'Description' },
    { id: 14, title: 'Item 14', description: 'Description' },
    { id: 15, title: 'Item 15', description: 'Description' },
    { id: 16, title: 'Item 16', description: 'Description' },
    { id: 17, title: 'Item 17', description: 'Description' },
    { id: 18, title: 'Item 18', description: 'Description' },
    { id: 19, title: 'Item 19', description: 'Description' },
    { id: 20, title: 'Item 20', description: 'Description' },
    { id: 21, title: 'Item 21', description: 'Description' }
];

function FlatListScreen() {
    const flatRef = useRef<FlatList>(null);
    const { start } = useGuidedTour({initialName: 'header', welcomeData: {title: "FlatList", description: 'qualquer coisa 2'}});

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
                    data={data}
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
