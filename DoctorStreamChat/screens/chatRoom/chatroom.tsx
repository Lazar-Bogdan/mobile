import React, { useEffect, useState, useContext, useCallback } from 'react'
import io from 'socket.io-client';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage"
const socket = io("http://127.0.0.1:3000");

export default function Chat ({navigation}) {
    const [message, setMessage] = useState(" ");
    const [chatMessage, setChatMessage] = useState(["test"]);
    const[visible, setVisible] = React.useState(10);
    const [outputMessage, setOutputMessage] = useState(" ");

    async function submitChatMessage(){
        // socket.emit("chat message", message);
        // setMessage(" ");
        // socket.on("chat message", msg =>{
        //     setMessage(chatMessage=> [...chatMessage, msg]);
        //     console.log(msg);
        // });

        const email = await AsyncStorage.getItem('email');
        socket.on("message", msg => {
            // setMessage(chatMessage=> [...chatMessage, msg]);
            setOutputMessage(msg);
            setMessage(" ");
            console.log(msg);
        });

        // socket.emit("join", {id:"test", username:email});
        socket.emit("message", {id: "test", message:message});
        
    }

    function mapChannels(List){
        if(!List){List=[];}
        console.log(List.length);
        const Filtered = List.slice(0, visible).map((item) =>
            <Text>{item}</Text> 
        );
        return Filtered;
    }
    
    return (
        <SafeAreaView>
            <TextInput 
                style={{height: 40, borderWidth:2}}
                value={message}
                autoCorrect={false}
                clearButtonMode="always"  
                onChangeText={chatMessage => {
                    setMessage(chatMessage);

                }}
            ></TextInput>
            <TouchableOpacity onPress={()=>{submitChatMessage()}} style={styles.buttonContainer}>
                <Text>Send</Text> 
            </TouchableOpacity>
            <Text>{outputMessage}</Text>
        </SafeAreaView>
      );
};

    
const styles = StyleSheet.create({
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