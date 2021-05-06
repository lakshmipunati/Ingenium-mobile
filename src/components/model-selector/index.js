import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import ModalPicker from 'react-native-modal-selector';

export function ModelSelector(props) {
    // debugger
    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <ModalPicker
                    style={styles.pickerStyle}
                    selectStyle={{ height: 45 }}
                    data={props.listItems}
                    accessible={true}
                    initValue={(props.listItems[0].label)}
                // onChange={(option) => { this.onSelectionChange(option.key) }} 
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
    }
});
