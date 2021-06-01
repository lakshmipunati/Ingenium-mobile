import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import ModalPicker from 'react-native-modal-selector';
import { DownArrowIcon } from "../../assets";


export function ModelSelector(props) {
    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <ModalPicker
                    style={styles.pickerStyle}
                    selectStyle={{ height: 40, borderColor: props.isConditionCodeEnable ? 'red' : '#ccc', borderWidth: 2, paddingRight: 10 }}
                    data={props.listItems}
                    accessible={true}
                    // selectTextStyle={props.selectTextStyle ? {fontSize: 10} : {fontSize: 10}}
                    initValueTextStyle={props.selectTextStyle ? props.selectTextStyle : {color: 'black'}}
                    initValue={props.initValue ? props.initValue : ""}
                    onChange={(option) => { props.onChange(option) }}
                    cancelText="Cancel"
                />
                {/* <View style={styles.dArrowContainer}>
                    <DownArrowIcon height="20px" width='14px' fill="#ccc" />
                </View> */}
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
        height: 45,
        position: 'relative'
    },
    pickerStyle: {
        // borderWidth: 1,
        borderRadius: 10,
        // borderColor: '#ccc',
        flex: 1,
        height: 10,
    },
    dArrowContainer: {
        position: 'absolute',
        right: 6,
        top:10,
        bottom: 0
    },
  
});
