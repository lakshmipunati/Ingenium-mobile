import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet} from 'react-native';
import {Provider} from "react-redux"
import {Navigation} from "./src/navigation"
import { store, retrieveTokenFromStorage } from './src/redux';
export default function App(props) {
  return (
    <Provider store={store}>
      <Navigation {...props}/>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
