import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Linking } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';

import DoctorMessage from './DoctorMessageTab';
import DoctorProfileTab from './DoctorProfileTab';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function Bottom({navigation}) {
    const colorScheme = useColorScheme();

  async function getStorage(){
    try{
      const email = await AsyncStorage.getItem('email');
      const response = await fetch(
        'http://192.168.100.27:3000/users/getUserUnderEmail',{headers:{email:email}}
      );
      let json = await response.json();
      if(response){
        await AsyncStorage.setItem('id',json[0]._id);
      }

    }catch(err){

    }
  }
  React.useEffect(()=>{
    // console.log('id : ');
    // console.log(AsyncStorage.getItem('id'));
  },[getStorage()]);

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Messages"
        component={DoctorMessage}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name="comments" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description') }
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={DoctorProfileTab}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
  }
  