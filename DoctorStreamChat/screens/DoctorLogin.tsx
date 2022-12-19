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
        <Text style={styles.header}>Welcome back Dr.</Text>
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
            <Text style={{color:'white'}}>Login</Text> 
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
  header: {
    marginTop:150,
    left:110,
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

export default DoctorLogin;