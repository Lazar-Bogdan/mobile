import React from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';


export default function EditProfile ({navigation}) {
  const [username, onChangeUsername] = React.useState("");
  const [email, onChangeemail] = React.useState("");

  function onCancel() {
    navigation.navigate('Root');
  }

  function onComplete() {

  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
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
        <Button title={'Gallery'} onPress={pickImage} />
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