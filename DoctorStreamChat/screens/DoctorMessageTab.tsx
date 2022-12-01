import React, {useEffect} from "react";
import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {StyleSheet, Button, SafeAreaView, TouchableOpacity, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"


export default function DoctorMessage({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [channels, setChannels] = React.useState([{subscription:""}]);
  const [doctors, setDoctors] = React.useState([]);
  const [doctorsDetails, setDoctorsDetails] = React.useState([]);
  const[visible, setVisible] = React.useState(10);

  async function getSubFromDatabase(){
    const email = await AsyncStorage.getItem('email')
    const response = await fetch(
        'http://localhost:2000/messages/doctorMessage',{headers: { doctor: email,}}
    );
    //let json = await response.text()
    let json = await response.json();
    setDoctorsDetails(doctorsDetails => [...doctorsDetails, json]);

    // //console.log(json);
    // if(response){
    //   // console.log(json[1].client);
    //   // console.log(json[0].client);
    //   for(var i=0; i<json.length; i++){
    //     // console.log(json);
    //     // console.log(json[i].doctor);
    //     const res = await fetch('http://localhost:2000/users/getUserUnderEmail', {headers: {email: json[i].client}});
    //     if(res){
    //       let json2 = await res.json();
    //     }
    //   }
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

  async function gotToMessage(id){
    console.log(id);
    await AsyncStorage.setItem('roomid',id);
    navigation.navigate('ChatDoctor');
  }

  function mapChannels(List){
    if(!List){List=[];}
    // console.log("list lenght");
    // console.log(List.length);
    const Filtered = List.slice(0, visible).map((item) =>
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>{gotToMessage(item[0].roomid)}}>
          <Text>{item[0].clientusername}</Text> 
      </TouchableOpacity>
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
});