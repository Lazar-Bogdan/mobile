import React from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, Button, Pressable } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage"



export default function EditProfile ({navigation}) {
  const [username, onChangeUsername] = React.useState("");
  const [email, onChangeemail] = React.useState("");
  const [image, setImage] = React.useState();
  const [age, setAge] = React.useState("");

  function onCancel() {
    navigation.navigate('Root');
  }

  async function onComplete() {
    if(username === "" || email === "" || age === ""){
      alert("Please complete all fields");
    }else{
      const id = await AsyncStorage.getItem('id')
      const response = await fetch(
          'http://localhost:2000/users/EditUserFromMobile',{
              method: 'PUT',
              headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  username:username,
                  email:email,
                  image:image,
                  age:age,
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    setImage(result);
    console.log(result);
  }
  return (
    <SafeAreaView style={styles.safe}>
        <TextInput
            style={styles.input}
            onChangeText={onChangeUsername}
            placeholder="Username"
        />
        <TextInput
            style={styles.input}
            onChangeText={onChangeemail}
            placeholder="Email"
            type="email"
        />
        <TextInput
            style={styles.input}
            onChangeText={setAge}
            placeholder="Age"
        />
        <Button title={'Choose a photo'} onPress={pickImage}  />
        <Pressable onPress={onCancel} style={styles.buttonContainer1}>
            <Text style={{color:'white'}}>Cancel</Text> 

        </Pressable>              
        <Pressable onPress={onComplete} style={styles.buttonContainer2}>
            <Text style={{color:'white'}}>Complete</Text> 
 
        </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    marginTop:100
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginTop:10
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