import React, { useEffect, useState, useContext, useCallback } from 'react'
import io from 'socket.io-client';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage"
const socket = io("http://127.0.0.1:3000");

export default function ChatDoctor ({navigation}) {
    const [message, setMessage] = useState(" ");
    const [chatMessage, setChatMessage] = useState(["test"]);
    const[visible, setVisible] = React.useState(30);
    const [outputMessage, setOutputMessage] = useState([]);

    const [loadConversation, setConversation] = useState([]);

    async function loadMessages(){
        try{
            const result = await fetch("http://localhost:2000/messages/getMessageDoctor", {
                method: 'GET',
                headers: {
                    roomid:"2"
                }
            })
            console.log("loadingMessageClient");
            let json = await result.json();
            console.log(json[0].msg);
            setOutputMessage(json);
        }catch(error){
            console.log(error);

        }
    }

    useEffect(()=>{
        loadMessages();
        console.log("use effect called");
    },[])

    async function submitChatMessage(){
        // socket.emit("chat message", message);
        // setMessage(" ");
        // socket.on("chat message", msg =>{
        //     setMessage(chatMessage=> [...chatMessage, msg]);
        //     console.log(msg);
        // });
        try{
            const result = await fetch("http://localhost:2000/messages/addMessageConversation", {
                method: 'POST',
                headers: {
                    from:"doctor",
                    to:"client",
                    roomid:"2",
                    msg:message
                }
            })
        }catch(error){
            console.log(error);
        }

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
            <>
                <Text>from:{item.from}</Text>
                <Text>to:{item.to}</Text>
                <Text>message:{item.msg}</Text>
            </> 
        );
        return Filtered;
      }
    
    return (
        <SafeAreaView>
            <ScrollView>
                {mapChannels(outputMessage)}
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
            </ScrollView>
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