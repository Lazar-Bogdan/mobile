import React, { useEffect, useState, useContext, useCallback } from 'react'
import IO from 'socket.io-client';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";

export default function Chat ({navigation}) {
    const socket = IO("ws://localhost:2000/socket", {
        forceNew: false
    })

    //var socket = IO();

    useEffect(() => {
        console.log('test');

        socket.emit('onConnect', "test1234");

        socket.on('onConnect', () => {
            console.log("socket id");
            console.log(socket.id);
            console.log("socket disconnected");
            console.log(socket.disconnected);
        })
    })
    return (
        <SafeAreaView>
            <Text>Login</Text> 
        </SafeAreaView>
      );
};
    
const styles = StyleSheet.create({

});