import React, { Component } from 'react';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { StyleSheet } from 'react-native';


export default function addInformation({ navigation }: RootTabScreenProps<'TabOne'>) {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});