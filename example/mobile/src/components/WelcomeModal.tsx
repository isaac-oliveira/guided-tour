import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons';
import type { WelcomeModalProps } from '@guided-tour/core';

const WelcomeModal = ({ title, text, onPress, onPressClose }: WelcomeModalProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalText}>{text}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.cancelButtomText}>Continuar</Text>
        </TouchableOpacity>
        <View style={{ position: 'absolute', right: 10, top: 10 }}>
            <IconButton name="x" color="gray" onPress={onPressClose} />
        </View>
      </View>
    </View>
  )
}


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

export { WelcomeModal }

const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      backgroundColor: '#313133a6',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalView: {
      alignItems: 'center',
      width: 270,
      height: 261,
      backgroundColor: '#ffffff',
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    modalTitle: {
      fontSize: 18,
      lineHeight: 22,
      letterSpacing: 0.01,
      fontWeight: 'bold',
      color: '#313133',
      marginTop: 16
    },
    modalText: {
      fontSize: 16,
      lineHeight: 19.2,
      letterSpacing: 0.03,
      color: '#ababab',
      marginTop: 16,
      marginHorizontal: 20,
      textAlign: 'center'
    },
    cancelButtomText: {
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: -0.26,
      color: '#1592e6',
      marginTop: 28
    }
  })