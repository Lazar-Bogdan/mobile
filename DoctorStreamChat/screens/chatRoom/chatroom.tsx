import React, { useEffect, useState, useContext, useCallback } from 'react'
import io from 'socket.io-client';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView, View } from "react-native";
import { Button, IconButton } from 'react-native-paper'

import AsyncStorage from "@react-native-async-storage/async-storage"

import { Icon, Avatar} from 'react-native-elements';


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
    const [clientImg, setClientImg] = useState(" ");
    const [clientUsername, setClientUsername] = useState(" ");
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

    async function getClientImg()
    {
        const x = await AsyncStorage.getItem('username');
        setClientUsername(x);
        const email = await AsyncStorage.getItem('email');
        const result = await fetch("http://localhost:2000/users/getClientImg", {
            method: 'GET',
            headers: {
                email:email
            }
        });
        let json = await result.json();
        setClientImg(json);
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
        getClientImg();
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
        console.log("MESSAGE IMAGE:");
        console.log(clientImg);
        console.log("CLIENT USERNAME");
        console.log(clientUsername);
        // for(var i=0; i<outputMessage.length; i++)
        // {
            
        //     filt = filt + "<Text>from:" + outputMessage[i].from + "</Text> <Text>To:" + outputMessage[i].to + "</Text>" + "<Text>Message:"+outputMessage[i].msg + "</Text"
        // }
        const filt = Array.from(outputMessage).map((outputMessage) =>
            <>
                {outputMessage.from === "client" ? (
                    <View style={styles.rec}>
                        <Avatar
                            position="absolute"
                            bottom={-15}
                            right={-5}
                            rounded
                            //For web
                            containerStyle={{
                                position: "absolute",
                                bottom: -15,
                                right: -5,
                            }}
                            size={30}
                            source={{
                                uri: "https://mydoctorbucket.s3.eu-central-1.amazonaws.com/profilePhotos/" +clientImg,
                            }}
                            ></Avatar>
                        <Text style={styles.recText}>{outputMessage.msg}</Text>
                    </View>) : (
                    <View style={styles.sender}>
                        <Avatar
                        position="absolute"
                        bottom={-15}
                        left={-5}
                        rounded
                        //For web
                        containerStyle={{
                            position: "absolute",
                            bottom: -15,
                            left: -5,
                        }}
                        size={30}
                        source={{ // de pus adevarata poza
                            uri: "https://mydoctorbucket.s3.eu-central-1.amazonaws.com/profilePhotos/" +clientImg,
                        }}
                        ></Avatar>
                        <Text style={styles.senderText}>{outputMessage.msg}</Text>
                    
                    </View>
                    )
                }
            </>
        );
        return filt;
    }

    return (
        
        <SafeAreaView style={{flex:1}}>
            <ScrollView >
                {
                    test()
                }
                
            </ScrollView>
            <View>
                <TextInput 
                    style={{height: 35, borderWidth:2, alignItems:'center'}}
                    value={message}
                    autoCorrect={false}
                    clearButtonMode="always"  
                    onChangeText={chatMessage => {
                        setMessage(chatMessage);

                    }}
                    ></TextInput>

                <Icon name="send" type="FontAwesome" color="black" onPress={()=>{submitChatMessage()}} />
            </View>
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
      rec: {//reciever style
        padding: 15,
        backgroundColor: "#ECECEC",//GREY
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    recText: {
        color:"black",
        fontWeight: "500",
        marginLeft: 10,

    },
    sender: {//sender style
        padding: 15,
        backgroundColor: "#2B68E6",//BLUE
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",

    },
    senderText:{
        color:"white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    }
});