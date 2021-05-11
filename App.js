import React from 'react';
import {Provider} from "react-redux"
import {Navigation} from "./src/navigation"
import { store } from './src/redux';
export default function App(props) {
  return (
    <Provider store={store}>
      <Navigation {...props}/>
      </Provider>
  );
}

