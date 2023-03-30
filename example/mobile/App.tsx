// In App.js in a new project
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    WelcomeModalProps,
    GuidedProvider,
    TooltipProps
} from '@guided-tour/core';

import HomeScreen from './src/pages/HomeScreen';
import SimpleScreen from './src/pages/SimpleScreen';
import FlatListScreen from './src/pages/FlatListScreen';
import ScrollViewScreen from './src/pages/ScrollViewScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tooltip, WelcomeModal } from './src/components';

const Stack = createNativeStackNavigator();

function App() {
    const insets = useSafeAreaInsets();

    const renderTooltip = ({
        data,
        isFirst,
        isLast,
        previous,
        next,
        close
    }: TooltipProps) => {
        return (
            <Tooltip
                {...data}
                title={data.title}
                isFirst={isFirst}
                isLast={isLast}
                previous={previous}
                next={next}
                close={close}
            />
        );
    };

    const renderWelcome = ({
        closeWelcome,
        close,
        data
    }: WelcomeModalProps) => {
        return (
            <WelcomeModal
                title={data.title}
                text={data.description}
                onPressClose={close}
                onPress={closeWelcome}
            />
        );
    };

    return (
        <GuidedProvider
            backgroundColor="#000000a1"
            insets={insets}
            renderTooltip={renderTooltip}
            renderWelcome={renderWelcome}
        >
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Simple" component={SimpleScreen} />
                    <Stack.Screen name="FlatList" component={FlatListScreen} />
                    <Stack.Screen name='ScrollView' component={ScrollViewScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </GuidedProvider>
    );
}

export default App;
