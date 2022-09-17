import React from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage"



export default function DoctorEditProfile ({navigation}) {
  const [username, onChangeUsername] = React.useState("");
  const [email, onChangeemail] = React.useState("");
  const [image, setImage] = React.useState();
  const [age, setAge] = React.useState("");

  function onCancel() {
    navigation.navigate('DoctorProfile');
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
    <SafeAreaView>
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
        <TouchableOpacity onPress={onCancel} style={styles.buttonContainer}>
            <Text>Cancel</Text>  
        </TouchableOpacity>              
        <TouchableOpacity onPress={onComplete} style={styles.buttonContainer}>
            <Text>Complete</Text> 
        </TouchableOpacity>
    </SafeAreaView>
  );
};

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