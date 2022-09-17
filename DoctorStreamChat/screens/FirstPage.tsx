import React,{useEffect} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"


const FirstPage = ({navigation}) => {

    function user(){
        navigation.navigate('Login');
    }

    function doctor(){
        navigation.navigate('doctorLogin')
    }

    return (
        <SafeAreaView>     
            <Text>
                Are you a     
            </Text>      
            <TouchableOpacity onPress={()=>{user()}} style={styles.buttonContainer}>
                <Text>User</Text> 
            </TouchableOpacity>
            <Text>
                Or a 
            </Text>
            <TouchableOpacity onPress={()=>{doctor()}} style={styles.buttonContainer}>
                <Text>Doctor</Text> 
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

export default FirstPage;