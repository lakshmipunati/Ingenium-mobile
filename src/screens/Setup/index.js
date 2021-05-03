import React from 'react';
import { Text, View } from 'react-native';
import { SharedTextInput } from '../../components';

export const Setup=(props)=>{
    return(
        <View style={{flex: 1}}>
          <SharedTextInput />
        </View>
    )
}