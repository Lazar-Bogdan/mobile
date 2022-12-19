import React,{useEffect} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"


const Login = ({navigation}) => {
  const [email, onChangeemail] = React.useState("");
  const [password, onChangePassword] = React.useState("");


  async function getLogin(){
    if(email === "" || password === ""){
      alert("Please complete all fields!");
    }else{
      try {
          const response = await fetch(
            //https://backend-server-doctor.herokuapp.com/auth/login
              'http://localhost:2000/auth/login',{
                  method: 'POST',
                  headers: {
                      email: email,
                      password: password
                  },
                  body: JSON.stringify({
                      email: email,
                      password: password
                  })
          });
        if(response.ok == true){
          await AsyncStorage.setItem('email',email);
          navigation.navigate('Root');
        }
      } catch (error) {
        alert("Some error occoured, please try again.");
      }
    };
  }

  return (
    <SafeAreaView style={styles.background}>
        <Text style={styles.header}>Welcome back.</Text>
        
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
        <Pressable onPress={()=>{getLogin()}} style={styles.buttonContainer}>
            <Text style={{color:'white'}}>Login</Text> 
        </Pressable>
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
  header: {
    marginTop:150,
    left:120,
    fontSize: 21,
    color: 'black',
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  buttonContainer: {
    display:"flex",
    marginTop:20,
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    left:120,
    borderRadius:30,
    backgroundColor: 'black',
    flexDirection:"row"
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
});

export default Login;