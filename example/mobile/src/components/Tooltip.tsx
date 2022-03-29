import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Tooltip = ({
    title,
    description,
    isFirst,
    isLast,
    previous,
    next,
    close
}) => {
    return (
        <View
            style={{
                backgroundColor: 'white',
                minWidth: 150,
                maxWidth: 150,
                padding: 20,
                margin: 5,
                borderRadius: 10
            }}
        >
            <Text style={{ marginBottom: 5 }}>{title}</Text>
            <Text style={{ color: 'gray', marginBottom: 10 }}>
                {description}
            </Text>
            <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
                {!isFirst && (
                    <IconButton
                        name="chevron-left"
                        color="#0af"
                        backgroundColor="#0af2"
                        onPress={previous}
                    />
                )}
                {!isLast && (
                    <IconButton
                        name="chevron-right"
                        color="#0af"
                        backgroundColor="#0af2"
                        onPress={next}
                    />
                )}
            </View>
            <View style={{ position: 'absolute', right: 10, top: 10 }}>
                <IconButton name="x" color="gray" onPress={close} />
            </View>
        </View>
    );
};

const IconButton = ({
    name,
    color,
    backgroundColor = 'transparent',
    onPress
}) => {
    return (
        <TouchableOpacity
            style={{
                width: 36,
                height: 36,
                borderRadius: 36,
                marginHorizontal: 5,
                backgroundColor,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={onPress}
        >
            <Feather name={name} size={24} color={color} />
        </TouchableOpacity>
    );
};

export { Tooltip };
