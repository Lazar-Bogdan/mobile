import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Pressable
} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage"

const DoctorProfileTab = ({navigation}) => {

  const [img, setClientImg] = React.useState("");
  
  async function getImg()
  {
    const email = await AsyncStorage.getItem('email');
    const result = await fetch("http://192.168.100.27:3000/doctor/getDoctorImg", {
        method: 'GET',
        headers: {
            email:email
        }
    });
    let json = await result.json();
    setClientImg(json);
  }

  React.useEffect(() => {
    getImg();
  })
  
  function onPress(){
    navigation.navigate('DoctorEdit');
  }
  return (
    <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri: "https://mydoctorbucket.s3.eu-central-1.amazonaws.com/profilePhotos/"+ img}}/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.title}>Chat</Text>

            <Pressable onPress={onPress} style={styles.buttonContainer1}>
              <Text style={{color:'white'}}>Edit Profile</Text> 
            </Pressable>                
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    filter: 'blur(8px)'
  },
  header:{
    backgroundColor: "#00BFFF",
    height:200,
    filter: 'blur(8px)',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
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
    backgroundColor: 'black',
    flexDirection:"row"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DoctorProfileTab;
