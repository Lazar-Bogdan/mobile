import React, {useEffect} from "react";
import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {StyleSheet, Button, SafeAreaView} from "react-native";
import axios from "axios";

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [channels, setChannels] = React.useState([{subscription:""}]);
  const [doctors, setDoctors] = React.useState([]);
  const [doctorsDetails, setDoctorsDetails] = React.useState([]);
  const[visible, setVisible] = React.useState(10);

  async function getSubFromDatabase(){
    const response = await fetch(
        'http://localhost:2000/messages/clientMessage',{headers: { client: "bogdilazar5@gmail.com",}}
    );
    //let json = await response.text()
    let json = await response.json();
    if(response){
      // console.log(json.length);
      for(var i=0; i<json.length; i++){
        // console.log(json);
        // console.log(json[i].doctor);
        const res = await fetch('http://localhost:2000/doctor/getDoctorUnderEmail', {headers: {email: json[i].doctor}});
        if(res){
          let json2 = await res.json();
          // console.log(json2);
          setDoctorsDetails(doctorsDetails => [...doctorsDetails, json2]);
        }
      }
      //console.log(doctorsDetails.length);
    }
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


  function mapChannels(List){
    if(!List){List=[];}
    const Filtered = List.slice(0, visible).map((item) =>
      <Button title={"test"}  />
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
});
