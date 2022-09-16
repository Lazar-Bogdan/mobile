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

import AsyncStorage from "@react-native-async-storage/async-storage"



export default function AddInformation({ navigation }: RootTabScreenProps<'TabOne'>) {
    function onCancel() {
      navigation.navigate('Root');
    }

    const [height,setHeight] = React.useState("");
    const [widht, setWidth] = React.useState("");
    const [pulse, setPulse] = React.useState("");

    async function onComplete() {
      if(height === "" || widht === "" || pulse === ""){
        alert("Please complete all fields!");
      }else{
        const id = await AsyncStorage.getItem('id')
        const response = await fetch(
            'http://localhost:2000/users/addInfoFromMobile',{
                method: 'PUT',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    height:height,
                    width:widht,
                    pulse:pulse,
                    _id:id
                })
        });
        if(response){
          alert(
            "Information added"
          );
          navigation.navigate('Root');
        }else{
          alert(
            "Information could not be added correctly. Please try again."
          );
        }
      }
    }
    return (
      <SafeAreaView>
          <TextInput
              style={styles.input}
              onChangeText={setHeight}
              placeholder="Height"
          />
          <TextInput
              style={styles.input}
              onChangeText={setWidth}
              placeholder="Width"
          />
          <TextInput
              style={styles.input}
              onChangeText={setPulse}
              placeholder="Pulse"
          />
          <TouchableOpacity onPress={onCancel} style={styles.buttonContainer}>
              <Text>Cancel</Text>  
          </TouchableOpacity>              
          <TouchableOpacity onPress={onComplete} style={styles.buttonContainer}>
              <Text>Add information</Text> 
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
