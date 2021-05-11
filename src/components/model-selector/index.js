import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import ModalPicker from 'react-native-modal-selector';


export function ModelSelector(props) {
    // debugger
    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <ModalPicker
                    style={props.isConditionCodeEnable ? styles.pickerStyleDanger : styles.pickerStyle}
                    selectStyle={{ height: 45 }}
                    data={props.listItems}
                    accessible={true}
                    initValue={props.initValue ? props.initValue : (props.listItems.length!=0 && props.listItems[0].label)}
                    onChange={(option) => { props.onChange(option) }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 5
    },
    pickerContainer: {
        height: 45
    },
    pickerStyle: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        flex: 1,
        height: 45
    },
    pickerStyleDanger: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'red',
        flex: 1,
        height: 45,
    }
});
