
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from "../screens"
import BottomTabNavigator from './BottomTabNavigator';
import {retrieveTokenFromStorage, removeAccessTokenFromStorage} from "../redux"
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { LogoWithVersion } from '../components';
  
  const Tab = createBottomTabNavigator();
  
  export function Navigation() {
    const [isLogin, setIsLogin] = useState(false);
    const [loader, setLoader] = useState(true);
    const state = useSelector((state)=>state.login);

    useEffect(()=>{
      tokenService();
    },[loader, isLogin, state]);

    const tokenService=async()=>{   
      setLoader(state.loading)
      const d = await state.isLogin;
      setIsLogin(d ? true : false);
    }

    if(loader){
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LogoWithVersion />
        </View>
      )
    }
    return (
      <NavigationContainer>
        {isLogin ? <RootNavigator /> : <LoginNavigator /> }
      </NavigationContainer>
    );
  }
 
  const Stack = createStackNavigator();
 
function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Login" component={Login} /> */}
      <Stack.Screen name="Root" component={BottomTabNavigator}/>
    </Stack.Navigator>
  );
}

function LoginNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}