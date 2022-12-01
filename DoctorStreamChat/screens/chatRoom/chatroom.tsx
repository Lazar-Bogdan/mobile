import React, { useEffect, useState, useContext, useCallback } from 'react'
import io from 'socket.io-client';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage"
//const socket = io("http://127.0.0.1:3000");

export default function Chat ({navigation}) {
    const [message, setMessage] = useState(" ");
    const [chatMessage, setChatMessage] = useState(["test"]);
    const[visible, setVisible] = React.useState(50);
    const [outputMessage, setOutputMessage] = useState([{
        from: " ",
        to: " ",
        msg: " ",
    }]);
    const [socketMessage, setSocketMessage] = useState([""]);
    const [loadConversation, setConversation] = useState([]);
    const [socket, setSocket] = useState(null)
    
    async function loadMessages(){

        const roomid = await AsyncStorage.getItem('roomid');
        console.log("roomid:");
        console.log(roomid);
        const result = await fetch("http://localhost:2000/messages/getRoomMessage", {
            method: 'GET',
            headers: {
                roomid:roomid
            }
        })
        //console.log("loadingMessageClient");
        let json = await result.json();
        setOutputMessage(json);
    }


    useEffect(() =>{
        if(socket === null)
        {
            setSocket(io("http://127.0.0.1:3000"));
        }
        if(socket)
        {
            socket.on("message", msg => {
                setOutputMessage(msg);
                console.log(msg);
                setSocketMessage(socketMessage => [...socketMessage, msg]);
            });
        }
    },[socket])

    useEffect(()=>{
        loadMessages();
    },[socketMessage])

    async function submitChatMessage(){
        // socket.emit("chat message", message);
        // setMessage(" ");
        // socket.on("chat message", msg =>{
        //     setMessage(chatMessage=> [...chatMessage, msg]);
        //     console.log(msg);
        // });
        const roomid = await AsyncStorage.getItem('roomid');


        //!! DE SCOS CAND VREM SA TRIMITEM CATRE BAZA
        const result = await fetch("http://localhost:2000/messages/addMessageConversation", {
            method: 'POST',
            headers: {
                from:"client",
                to:"doctor",
                roomid:roomid,
                msg:message
            }
        })
        
        setSocketMessage(socketMessage => [...socketMessage, message]);

        // loadMessages();


        // socket.emit("join", {id:"test", username:email});
        socket.emit("message", {id: roomid, message:message});
        
    }


    function mapChannels(List){
        if(!List){List=[];}
        console.log("size of list of already messages");
        console.log(List.length);
        const Filtered = List.slice(0, visible).map((item) =>
            <>
                {/* <Text>from:{item.from}</Text>
                <Text>to:{item.to}</Text>
                <Text>message:{item.msg}</Text> */}
                <Text>Test</Text>
            </> 
        );
        return Filtered;
      }

    function mapChannelsSocket(List){
        console.log("socketMap");
        if(!List){List=[];}
        console.log(List.length);
        const Filtered = List.slice(0, visible).map((item) =>
            <>
                <Text>{item}</Text>
            </> 
        );
        return Filtered;
      }
    
    function test()
    {
        console.log("outputmessage lengt");
        console.log(outputMessage.length);
        console.log(outputMessage);
        // for(var i=0; i<outputMessage.length; i++)
        // {
            
        //     filt = filt + "<Text>from:" + outputMessage[i].from + "</Text> <Text>To:" + outputMessage[i].to + "</Text>" + "<Text>Message:"+outputMessage[i].msg + "</Text"
        // }
        const filt = Array.from(outputMessage).map((outputMessage) =>
            <>
            <Text>from:{outputMessage.from}</Text>
            <Text>to:{outputMessage.to}</Text>
            <Text>message:{outputMessage.msg}</Text> 
            </>
        );
        return filt;
    }

    return (
        
        <SafeAreaView>
            <ScrollView>
                {
                    test()
                }
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