import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function SharedButton(props){
    return(
        <TouchableOpacity style={styles.btn}>
            <Text style={styles.name}>{props.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn:{
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#059DCC',
    },
    name: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18
    },

})