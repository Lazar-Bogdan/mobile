import React,{useEffect} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"


const DoctorLogin = ({navigation}) => {
  const [email, onChangeemail] = React.useState("");
  const [password, onChangePassword] = React.useState("");


  async function getLogin(){
    if(email === "" || password === ""){
      alert("Please complete all fields!");
    }else{
      console.log(email);
      console.log(password);
      try {
          const response = await fetch(
              'http://localhost:2000/auth/doctorLogin',{
                  method: 'POST',
                  headers: {
                    email: email,
                    password: password
                  }
          });
        if(response.ok == true){
          await AsyncStorage.setItem('email',email);
          navigation.navigate('DoctorIndex');
        }
      } catch (error) {
        alert("Some error occoured, please try again.");
      }
    };
  }

  return (
    <SafeAreaView>
        <TextInput
            style={styles.input}
            onChangeText={onChangeemail}
            placeholder="Email"
        />
        <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            placeholder="Password"
            secureTextEntry={true}
        />             
        <TouchableOpacity onPress={()=>{getLogin()}} style={styles.buttonContainer}>
            <Text>Login</Text> 
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

export default DoctorLogin;