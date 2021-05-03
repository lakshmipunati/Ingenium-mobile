import React from 'react';
import { Text, View } from 'react-native';
import {TextInputWithIcon} from "../../components"
export function Login(props){
    return(
        <View>
            <Text>Login</Text>
            <TextInputWithIcon name="username" placeholder="Enter user name" label="Enter user name" />
        </View>
    )
}