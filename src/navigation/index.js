
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from "../screens"
import BottomTabNavigator from './BottomTabNavigator';

  
  const Tab = createBottomTabNavigator();
  
  export function Navigation() {
    return (
      <NavigationContainer>
          <RootNavigator />
      </NavigationContainer>
    );
  }
 
  const Stack = createStackNavigator();
 
function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Root" component={BottomTabNavigator}/>
      {/* <Stack.Screen name="NotFound" component={NotFoundScZreen} options={{ title: 'Oops!' }} /> */}
    </Stack.Navigator>
  );
}