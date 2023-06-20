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
  TextInput,
  Pressable
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
            'http://192.168.100.27:3000/users/addInfoFromMobile',{
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
      <SafeAreaView style={styles.safe}>
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
          <Pressable onPress={onCancel} style={styles.buttonContainer1}>
            <Text style={{color:'white'}}>Cancel</Text> 

          </Pressable>              
          <Pressable onPress={onComplete} style={styles.buttonContainer2}>
              <Text style={{color:'white'}}>Complete</Text> 
  
          </Pressable>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  safe: {
    marginTop:100
  },
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
  buttonContainer1: {
    display:"flex",
    marginTop:20,
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    borderRadius:30,
    left:120,
    backgroundColor: 'black',
    flexDirection:"row"
  },
  buttonContainer2: {
    display:"flex",
    marginTop:5,
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    borderRadius:30,
    left:120,
    backgroundColor: 'black',
    flexDirection:"row"
  },
});
