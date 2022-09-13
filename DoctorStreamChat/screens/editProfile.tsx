import React from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";

const EditProfile = ({navigation}) => {
  const [username, onChangeUsername] = React.useState("");
  const [email, onChangeemail] = React.useState("");

  function onCancel() {
    navigation.navigate('Root');
  }

  function onComplete() {

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

export default EditProfile;