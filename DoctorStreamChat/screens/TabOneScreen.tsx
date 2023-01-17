import React, {useEffect} from "react";
import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {StyleSheet, Button, SafeAreaView, TouchableOpacity, Pressable, Text} from "react-native";
import axios from "axios";
import {   Avatar, Card, Title, Paragraph } from 'react-native-paper'
import { Icon } from 'react-native-elements';



import AsyncStorage from "@react-native-async-storage/async-storage"

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [channels, setChannels] = React.useState([{subscription:""}]);
  const [doctors, setDoctors] = React.useState([]);
  const [doctorsDetails, setDoctorsDetails] = React.useState([]);
  const[visible, setVisible] = React.useState(10);
  async function gotToMessage(id){
    console.log("roomid");
    console.log(id);
    await AsyncStorage.setItem('roomid',id);
    navigation.navigate('Chat');
  }

  console.log("tabOneScreen");

  async function getSubFromDatabase(){
    const email = await AsyncStorage.getItem('email')
    const response = await fetch(
        'http://localhost:2000/messages/clientMessage',{headers: { client: email,}}
    );
    //let json = await response.text()
    let json = await response.json();
    console.log("response from database");
    console.log(json);
    setDoctorsDetails(json);
    // if(response){
    //   // console.log(json.length);
    //   for(var i=0; i<json.length; i++){
    //     // console.log(json);
    //     // console.log(json[i].doctor);
    //     const res = await fetch('http://localhost:2000/doctor/getDoctorUnderEmail', {headers: {email: json[i].doctor}});
    //     if(res){
    //       let json2 = await res.json();
    //       // console.log(json2);
    //       setDoctorsDetails(doctorsDetails => [...doctorsDetails, json2]);
    //     }
    //   }
    //   // console.log(doctorsDetails.length);
    // }
  }


  // async function getDoctorsDetails(){
  //   console.log("array " + doctors);
  //   if(doctors.length == 1){
  //     console.log(doctors[0].doctor);
  //     const size = doctors.length;
  //     for(var i=0; i<size; i++){
  //       const response = await fetch('http://localhost:2000/doctor/getDoctorUnderEmail', {headers: {email: doctors[i].doctor}});
  //       if(response){
  //         console.log("doctor details:")
  //         console.log(response.json);
  //         //setDoctorsDetails(doctorsDetails=>[... doctorsDetails,response.json]);
  //       }
  //     }
  //   }
  // }
  console.log("Doctor details containts : ");
  console.log(doctorsDetails);

  function mapChannels(List){
    if(!List){List=[];}
    console.log(List.length);
    const Filtered = List.slice(0, visible).map((item) =>
      <Card key={item._id} onPress={() => {
              
      }}>
      <Card.Content>
          <View style={{
              flexDirection: 'row'
          }}>
              <Avatar.Image style={{}} size={60} source={{ uri: "https://mydoctorbucket.s3.eu-central-1.amazonaws.com/profilePhotos/"+item.doctorImg }} />
              <View style={{ flex: 1 }}>
                  <View style={{
                      flexDirection: 'row', alignItems: 'center'
                  }}>
                      <View style={{ marginHorizontal: 10, flex: 1, top:20 }}>
                          <Text style={{ fontSize: 16 }}>{item.doctorusername}</Text>
                      </View>
                      <View style={{ marginHorizontal: 10, flex: 1, top:20 }}>
                        <Icon name="message" type="MaterialCommunityIcons" color="black" onPress={()=>{gotToMessage(item.roomid)}} />
                      </View>
                  </View>
              </View>
          </View>
      </Card.Content>
    </Card>
    );
    return Filtered;
  }

  useEffect(() => {
    getSubFromDatabase();
    setDoctorsDetails(doctorsDetails => []);
  },[])

  return (
    <SafeAreaView>
      {mapChannels(doctorsDetails)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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
  buttonContaine1r: {
    display:"flex",
    marginTop:20,
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    borderRadius:30,
    backgroundColor: 'black',
    flexDirection:"row"
  },
});
