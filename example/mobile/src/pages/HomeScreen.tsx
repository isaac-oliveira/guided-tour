import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
    const navigation = useNavigation<any>();
    return (
        <View style={styles.container}>
            <Button
                title="See Simple Example"
                onPress={() => navigation.navigate('Simple')}
            />
            <Button
                title="See FlatList Example"
                onPress={() => navigation.navigate('FlatList')}
            />
            <Button
                title="See ScrollView Example"
                onPress={() => navigation.navigate('ScrollView')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
});

export default HomeScreen;
