import React, {useState, useEffect, useRef} from 'react';
import {Navigation} from "../navigation"

import {PanResponder, View } from "react-native"
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux';

export function AppContainer(props) {
  const timerId = useRef(false);
  const [timeForInactivityInSecond, setTimeForInactivityInSecond] = useState(
    4*3600*1000
    // 360000
  )
  useEffect(() => {
    resetInactivityTimeout()
  }, []);

  const dispatch = useDispatch()

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {        
        resetInactivityTimeout()
      },
    })
  ).current

  const resetInactivityTimeout = () => {
    clearTimeout(timerId.current)
    timerId.current = setTimeout(() => {
      dispatch(logoutUser())
  
      // action after user has been detected idle
    }, timeForInactivityInSecond)
  }

  return (
    
    
        <View style={{ flex: 1 }} {...panResponder.panHandlers}>
            <Navigation {...props}/>      
        </View>
  
  
  );
}
