import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';



const DoctorProfileTab = ({navigation}) => {
  
  function onPress(){
    navigation.navigate('DoctorEdit');
  }
  return (
    <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.title}>Chat</Text>

            <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
              <Text>Edit Profile</Text>  
            </TouchableOpacity>              
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{

  },
  header:{
    backgroundColor: "#00BFFF",
    height:200,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DoctorProfileTab;