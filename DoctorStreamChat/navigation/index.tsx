/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Linking, Pressable } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import addInformation from '../screens/addInformation';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Login from '../screens/login';
import EditProfile from '../screens/editProfile';
import DoctorMessage from '../screens/DoctorMessageTab';
import DoctorEditProfile from '../screens/DoctorEditProfile';
import DoctorProfileTab from '../screens/DoctorProfileTab';
import FirstPage from '../screens/FirstPage';
import DoctorLogin from '../screens/DoctorLogin';
import Bottom from '../screens/DoctorIndex';
import Chat from '../screens/chatRoom/chatroom';
import ChatDoctor from '../screens/chatRoom/chatRoomDoctor';

import { Icon, Avatar} from 'react-native-elements';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FirstPage" component={FirstPage} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerBackTitle:'Back', headerShown: true }} />
      <Stack.Screen name="doctorLogin" component={DoctorLogin} options={{ headerBackTitle:'Back',title:'Login', headerShown: true }} />
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Info" component={addInformation} options={{title: 'Information' }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerBackTitle:'Back', title: 'Edit Profile' }} />
      <Stack.Screen name="DoctorMessage" component={DoctorMessage} options={{headerBackTitle:'Back', title:'Messages'}} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfileTab} options={{headerBackTitle:'Back',title:'Profile'}} />
      <Stack.Screen name="Chat" component={Chat} options={{headerBackTitle:'Back', title:'Chat'}} />
      <Stack.Screen name="ChatDoctor" component={ChatDoctor} options={{headerBackTitle:'Back', title:'ChatDoctor'}} />
      <Stack.Screen name="DoctorEdit" component={DoctorEditProfile} options={{headerBackTitle:'Back', title:'Edit Profile'}} />
      <Stack.Screen name="DoctorIndex" component={Bottom} options={{headerShown: false}} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} options={{title:'Info'}}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  async function getStorage(){
    try{
      const email = await AsyncStorage.getItem('email');
      const response = await fetch(
        'http://localhost:2000/users/getUserUnderEmail',{headers:{email:email}}
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
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Chat',
          tabBarIcon: ({ color }) => <TabBarIcon name="comments" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => Linking.openURL('mailto:bogdilazar5@gmail.com?subject=QUESTION&body=') }
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
        component={TabTwoScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
