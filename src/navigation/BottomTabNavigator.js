import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { Setup, Data, UDFData, Description } from "../screens"

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {

  const tabBarOptions = {
    style: {
      paddingBottom: 18,
      backgroundColor: '#059DCC',
    },
    labelStyle: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    activeTintColor: '#fff',
    inactiveTintColor: '#D4D1CF',
    upperCaseLabel: false,
  }
  return (
    <BottomTab.Navigator
      initialRouteName="DATA"
      tabBarOptions={tabBarOptions}
    >
      <BottomTab.Screen
        name="DATA"
        component={TabDataNavigator}
      />
      <BottomTab.Screen
        name="DESCRIPTION"
        component={TabDescriptionNavigator}
      />
      <BottomTab.Screen
        name="UDF"
        component={TabUdfNavigator}
      />
      <BottomTab.Screen
        name="SETUP"
        component={TabSetupNavigator}
      />
    </BottomTab.Navigator>
  );
}


const TabSetupStack = createStackNavigator();

function TabSetupNavigator() {
  return (
    <TabSetupStack.Navigator>
      <TabSetupStack.Screen
        name="TabOneScreen"
        component={Setup}
        options={{ headerTitle: 'Setup Form' }}
      />
    </TabSetupStack.Navigator>
  );
}

const TabDataStack = createStackNavigator();

function TabDataNavigator() {
  return (
    <TabDataStack.Navigator>
      <TabDataStack.Screen
        name="TabTwoScreen"
        component={Data}
        options={{ headerTitle: 'Data Form' }}
      />
    </TabDataStack.Navigator>
  );
}


const TabDescritionStack = createStackNavigator();

function TabDescriptionNavigator() {
  return (
    <TabDescritionStack.Navigator>
      <TabDescritionStack.Screen
        name="TabDescriptionScreen"
        component={Description}
        options={{ headerTitle: 'Description Catalog Form' }}
      />
    </TabDescritionStack.Navigator>
  );
}

const TabUdfStack = createStackNavigator();

function TabUdfNavigator() {
  return (
    <TabUdfStack.Navigator>
      <TabUdfStack.Screen
        name="TabDescriptionScreen"
        component={UDFData}
        options={{ headerTitle: 'UDF Form' }}
      />
    </TabUdfStack.Navigator>
  );
}
