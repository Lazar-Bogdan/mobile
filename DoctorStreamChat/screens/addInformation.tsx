import React, { Component } from 'react';
import { RootTabScreenProps } from '../types';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput
} from 'react-native';


export default function AddInformation({ navigation }: RootTabScreenProps<'TabOne'>) {
    function onCancel() {
      navigation.navigate('Root');
    }

    function onComplete() {

    }
    return (
      <SafeAreaView>
          <TextInput
              style={styles.input}
          />
          <TextInput
              style={styles.input}
          />
          <TouchableOpacity onPress={onCancel} style={styles.buttonContainer}>
              <Text>Cancel</Text>  
          </TouchableOpacity>              
          <TouchableOpacity onPress={onComplete} style={styles.buttonContainer}>
              <Text>Complete</Text> 
          </TouchableOpacity>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});
