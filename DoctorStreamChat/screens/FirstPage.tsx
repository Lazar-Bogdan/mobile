import React,{useEffect} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, Animated, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { View } from "../components/Themed";
import MovingText from 'react-moving-text';
import AnimatedTyping from './AnimatedTyping';

const FirstPage = ({navigation}) => {

    function user(){
        navigation.navigate('Login');
    }

    function doctor(){
        navigation.navigate('doctorLogin')
    }

    return (
        <SafeAreaView>

            <View style={styles.view}>
                <AnimatedTyping text={["Welcome to our Doctor4You mobile application. We are glad that you choose our service, please choose the following type of login."]} /> 

                <View style={{flexDirection: 'row', left:40}}>
                    <Pressable onPress={()=>{user()}} style={styles.buttonContainer1}>
                        <Text style={{color:'white'}}>User</Text> 
                    </Pressable>
                    <TouchableOpacity onPress={()=>{doctor()}} style={styles.buttonContainer1}>
                        <Text style={{color:'white'}}>Doctor</Text> 
                    </TouchableOpacity>
                </View>
            </View>

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
  buttonContainer1: {
    display:"flex",
    marginTop:100,
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    borderRadius:30,
    backgroundColor: 'black',
    flexDirection:"row"
  },
  buttonContainer2: {
    display:"flex",
    left:100,
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    borderRadius:30,
    backgroundColor: 'black',
    flexDirection:"row"
  },
  view: {
      height:1000
  }
});

export default FirstPage;