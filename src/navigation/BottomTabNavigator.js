import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Dimensions, TouchableOpacity, PixelRatio } from 'react-native';
import { useDispatch } from 'react-redux';
import { LogoutIcon } from '../assets';
import { logoutUser } from '../redux';

import { Setup, Data, UDFData, Description } from '../screens';
import { proportionalSize } from '../utils';

const BottomTab = createBottomTabNavigator();
export default function BottomTabNavigator(props) {
  const tabBarOptions = {
    style: {
      // paddingBottom: 18,
      backgroundColor: '#059DCC',
    },
    labelStyle: {
      paddingBottom: 18,
      // fontSize: proportionalSize(40),
      fontWeight: 'bold',
    },
    activeTintColor: '#fff',
    inactiveTintColor: '#D4D1CF',
    upperCaseLabel: false,
    activeBackgroundColor: '#0CBED1',
    keyboardHidesTabBar: true,
    allowFontScaling: true,
  };
  return (
    <BottomTab.Navigator initialRouteName='DATA' tabBarOptions={tabBarOptions}>
      <BottomTab.Screen
        name='DATA'
        tabBarOptions={{ style: { backgroundColor: 'red' } }}
        component={TabDataNavigator}
        tabBarOptions={{ style: { padding: 20 } }}
      />
      <BottomTab.Screen
        name='DESCRIPTION'
        component={TabDescriptionNavigator}
      />
      <BottomTab.Screen name='UDF' component={TabUdfNavigator} />
      <BottomTab.Screen name='SETUP' component={TabSetupNavigator} />
    </BottomTab.Navigator>
  );
}

const TabSetupStack = createStackNavigator();

function TabSetupNavigator() {
  return (
    <TabSetupStack.Navigator>
      <TabSetupStack.Screen
        name='TabOneScreen'
        component={Setup}
        options={HeaderContainer('Setup Form')}
        //  options={{ headerTitle: 'Tab Setup Title' }}
      />
    </TabSetupStack.Navigator>
  );
}

const TabDataStack = createStackNavigator();

function TabDataNavigator() {
  return (
    <TabDataStack.Navigator>
      <TabDataStack.Screen
        name='TabTwoScreen'
        component={Data}
        options={HeaderContainer('Data Form')}
      />
    </TabDataStack.Navigator>
  );
}

const TabDescritionStack = createStackNavigator();

function TabDescriptionNavigator() {
  return (
    <TabDescritionStack.Navigator>
      <TabDescritionStack.Screen
        name='TabDescriptionScreen'
        component={Description}
        options={HeaderContainer('Description Catalog Form')}
      />
    </TabDescritionStack.Navigator>
  );
}

const TabUdfStack = createStackNavigator();

function TabUdfNavigator() {
  return (
    <TabUdfStack.Navigator>
      <TabUdfStack.Screen
        name='TabDescriptionScreen'
        component={UDFData}
        options={HeaderContainer('UDF Form')}
      />
    </TabUdfStack.Navigator>
  );
}

function HeaderContainer(headerTitle) {
  const dispatch = useDispatch();
  const _handleLogout = () => {
    dispatch(logoutUser());
  };
  return {
    headerTitle,
    headerRightContainerStyle: {
      paddingRight: 15,
    },
    headerRight: (props) => (
      <TouchableOpacity onPress={() => _handleLogout()}>
        <LogoutIcon height='40px' width='25px' fill='#059DCC' />
      </TouchableOpacity>
    ),
  };
}
