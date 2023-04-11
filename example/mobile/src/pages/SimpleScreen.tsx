import React from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { useGuidedTour } from '@guided-tour/core';
import { GuidedController } from '@guided-tour/mobile';

function SimpleScreen() {
    const { start } = useGuidedTour({
        initialName: 'rect-1',
        onClose: () => {
            console.log('Close simple');
        }
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <GuidedController
                    name="rect-1"
                    previousName={null}
                    nextName="rect-2"
                    tooltipData={{
                        title: 'Rect 1',
                        description: 'Componente Rect 1',
                        anchor: 'bottom_right'
                    }}
                    renderComponent={(ref) => (
                        <View ref={ref} style={styles.rect} />
                    )}
                />
                <GuidedController
                    name="rect-2"
                    previousName="rect-1"
                    nextName="rect-3"
                    tooltipData={{
                        title: 'Rect 2',
                        description: 'Componente Rect 2',
                        anchor: 'top_left'
                    }}
                    renderComponent={(ref) => (
                        <View
                            ref={ref}
                            style={[
                                styles.rect,
                                { backgroundColor: '#dc4200' }
                            ]}
                        />
                    )}
                />
                <View style={styles.horizontalContainer}>
                    <GuidedController
                        name="rect-3"
                        previousName="rect-2"
                        nextName="rect-4"
                        tooltipData={{
                            title: 'Rect 1',
                            description: 'Componente Rect 1',
                            anchor: 'bottom_right'
                        }}
                        renderComponent={(ref) => (
                            <View ref={ref} style={styles.rectHorizontal} />
                        )}
                    />
                    <GuidedController
                        name="rect-4"
                        previousName="rect-3"
                        nextName={null}
                        tooltipData={{
                            title: 'Rect 2',
                            description: 'Componente Rect 2',
                            anchor: 'top_left'
                        }}
                        renderComponent={(ref) => (
                            <View
                                ref={ref}
                                style={[
                                    styles.rectHorizontal,
                                    { backgroundColor: '#d0f' }
                                ]}
                            />
                        )}
                    />
                </View>
            </View>
            <Button title="Start" onPress={start} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16
    },
    rect: {
        width: '100%',
        height: 150,
        backgroundColor: '#ff0',
        borderRadius: 20,
        marginBottom: 20
    },
    horizontalContainer: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    rectHorizontal: {
        width: 150,
        height: 150,
        backgroundColor: 'blue',
        borderRadius: 20
    },
});

export default SimpleScreen;
