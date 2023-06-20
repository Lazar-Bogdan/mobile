import React, { useEffect, useState, useContext, useCallback, useRef } from 'react'
import io from 'socket.io-client';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Pressable, TextInput, Platform, TouchableOpacity, Text, Button, ScrollView, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    const [clientUsername, setClientUsername] = useState(" ");
    const [clientImg, setClientImg] = useState(" ");
    const [ doctorImg, setDoctorImg] = useState(" ");
    async function loadMessages(){

        const roomid = await AsyncStorage.getItem('roomid');
        console.log("roomid:");
        console.log(roomid);
        const result = await fetch("http://192.168.100.27:3000/messages/getRoomMessage", {
            method: 'GET',
            headers: {
                roomid:roomid
            }
        })
        //console.log("loadingMessageClient");
        let json = await result.json();
        console.log("TEST");
        console.log(json.clientImg);
        setOutputMessage(json.Messagges);
        setClientImg(json.clientImg);
        setDoctorImg(json.doctorImg);
    }
    const [client,setclient] = useState("");
    async function getClientImg()
    {
        const x = await AsyncStorage.getItem('username');
        setClientUsername(x);
        const email = await AsyncStorage.getItem('email');
        const result = await fetch("http://192.168.100.27:3000/doctor/getDoctorImg", {
            method: 'GET',
            headers: {
                email:email
            }
        });
        let json = await result.json();
        setDoctorImg(json);
        let y = await AsyncStorage.getItem('doctorusername');
        setclient(y);
    }

    useEffect(() =>{
        if(socket === null)
        {
            setSocket(io("http://192.168.100.27:3000"));
        }
        if(socket)
        {
            socket.on("message", msg => {
                setOutputMessage(msg);
                console.log(msg);
                setSocketMessage(socketMessage => [...socketMessage, msg]);
                loadMessages();
            });
        }
        getClientImg();
        
    },[socket, client])

    useEffect(()=>{
        loadMessages();
    },[socketMessage])

    async function submitChatMessage(){

        const roomid = await AsyncStorage.getItem('roomid');


        //!! DE SCOS CAND VREM SA TRIMITEM CATRE BAZA
        const result = await fetch("http://192.168.100.27:3000/messages/addMessageConversation", {
            method: 'POST',
            headers: {
                from:"doctor",
                to:"client",
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
    
    function showMessages()
    {
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
                                uri: "https://mydoctorbucket.s3.eu-central-1.amazonaws.com/profilePhotos/" +doctorImg,
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
    const scrollViewRef = useRef();
    const [offset,setOffset] = useState(0);

    const slowlyScrollDown = () => {
        const y = offset + 10000000;
        scrollViewRef.current.scrollTo({x: 0, y, animated: true});
        setOffset(y);
    }
    

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            enableAutomaticScroll={Platform.OS === 'ios'}
            extraScrollHeight={Platform.OS === 'ios' ? 0 : -100}
        >
            <SafeAreaView style={{flex:1}} onAccessibilityAction={() => navigation.setOptions({title:" " + client})} onLayout={() => navigation.setOptions({title:" " + client})}>
                <ScrollView ref={scrollViewRef} >                
                    <Button onPress={slowlyScrollDown} title="Slowly scroll a bit down..." />
                    {showMessages()}
                    
                </ScrollView>
                <View style={{height:40}}>
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
                    <View>

                    
                        <Pressable onPress={()=>{submitChatMessage(); slowlyScrollDown()}} style={styles.buttonContainer}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{'\u2192'}</Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
      );
};

    
const styles = StyleSheet.create({
    textInput:{
        width:300,
        height: 50,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: 'grey',
        borderRadius: 30,
        borderWidth:2 

    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 10,
      },
    buttonContainer: {
        display:"flex",
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:80,
        left:300,
        top:-50,
        borderRadius:30,
        flexDirection:"row"
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