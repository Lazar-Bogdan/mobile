import React, { useEffect, useState, useContext, useCallback } from 'react'
import io from 'socket.io-client';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";


export default function Chat ({navigation}) {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState({});

    // const socket = socketIO('https://backend-server-doctor.herokuapp.com/', {
    //         jsonp: false 
    // }); 
    // socket.connect(); 
    // socket.on('connect', () => { 
    //     console.log('connected to socket server'); 
    // });
    // //var socket = IO();

    useEffect(() => {
        const newSocketsocket = io("http://localhost:2000")
        //console.log(newSocketsocket);
        console.log('test');
        setSocket(newSocketsocket);
        return () => newSocketsocket.close();
      }, [setSocket]);
    
    useEffect(() => {
        const messageListener = (message) => {
                setMessages((prevMessages) => {
                const newMessages = {...prevMessages};
                newMessages[message.id] = message;
                return newMessages;
            });
        }
    },[]);

    // socket.on('message', messageListener);
    
    return (
        <SafeAreaView>
            <Text>Login</Text> 
            { socket ? (
                <Text>{messages.id}</Text>
            ) : (
                <Text>Not connected</Text>
            )}
        </SafeAreaView>
      );
};

    
const styles = StyleSheet.create({

});