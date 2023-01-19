import React, { useEffect, useState, useContext, useCallback, useRef } from 'react'
import io from 'socket.io-client';
import { SafeAreaView, StyleSheet, FlatList, TextInput, TouchableOpacity, Text, ScrollView, View, Button} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage"
//const socket = io("http://127.0.0.1:3000");
import { Icon, Avatar } from 'react-native-elements';

export default function ChatDoctor ({navigation}) {
    const [message, setMessage] = useState(" ");
    const [chatMessage, setChatMessage] = useState(["test"]);
    const[visible, setVisible] = React.useState(50);
    const [outputMessage, setOutputMessage] = useState([]);
    const [socketMessage, setSocketMessage] = useState([""]);
    const [loadConversation, setConversation] = useState([]);
    const [socket, setSocket] = useState(null)
    const [clientImg, setClientImg] = useState(" ");

    async function loadMessages(){
        const roomid = await AsyncStorage.getItem('roomid');

        const result = await fetch("http://localhost:2000/messages/getMessageDoctor", {
            method: 'GET',
            headers: {
                roomid:roomid
            }
        })
        console.log("loadingMessageClient");
        let json = await result.json();
        console.log(json[0].msg);
        setOutputMessage(json);
    }

    async function getDoctorImg()
    {
        const email = await AsyncStorage.getItem('email');
        const result = await fetch("http://localhost:2000/doctor/getDoctorImg", {
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
                // setMessage(chatMessage=> [...chatMessage, msg]);
                setOutputMessage(msg);
                setMessage(" ");
                console.log(msg);
                setSocketMessage(socketMessage => [...socketMessage, msg]);
    
            });
        }
        getDoctorImg()
    },[socket])

    useEffect(()=>{
        loadMessages();
        //console.log("use effect called");
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
                    from:"doctor",
                    to:"client",
                    roomid:roomid,
                    msg:message
                }
            })
        setSocketMessage(socketMessage => [...socketMessage, message]);

        const email = await AsyncStorage.getItem('email');

        // socket.emit("join", {id:"test", username:email});
        socket.emit("message", {id: roomid, message:message});
        setMessage("");
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

      const [offset,setOffset] = useState(0);
        const scrollViewRef = useRef();

        const slowlyScrollDown = () => {
            const y = offset + 10000000;
            scrollViewRef.current.scrollTo({x: 0, y, animated: true});
            setOffset(y);
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
                {outputMessage.from === "doctor" ? (
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
            <ScrollView ref={scrollViewRef} >                
                <Button onPress={slowlyScrollDown} title="Slowly scroll a bit down..." />
                {test()}
                
            </ScrollView>

            <View>
                <View>
                <TextInput 
                    style={styles.textInput}
                    value={message}
                    autoCorrect={false}
                    clearButtonMode="always"  
                    onChangeText={chatMessage => {
                        setMessage(chatMessage);
                    }}
                ></TextInput>
                </View>
                <View style={{top:-40}}>
                    <Icon style={{left:170, fontSize:100 }} name="send" type="FontAwesome" color="black" onPress={()=>{submitChatMessage(); slowlyScrollDown()}} />

                </View>    
            </View>
        </SafeAreaView>
      );
};

    
const styles = StyleSheet.create({
    textInput:{
        width:350,
        height: 50,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: 'grey',
        borderRadius: 30,
        borderWidth:2 

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