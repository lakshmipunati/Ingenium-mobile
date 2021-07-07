import React, {useState, useEffect, useRef} from 'react';
import {Provider} from "react-redux";
import { store } from './src/redux';
import {AppContainer} from "./src/AppContainer"
export default function App(props) {
  return(
      <Provider store={store}>          
          <AppContainer {...props}/>
      </Provider> 
  )
}
