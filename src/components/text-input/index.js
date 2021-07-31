import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View, Text, Image, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "../bar-code-scanner";
import { lookup, barcodeCamera, anchorIcon, searchLocation } from "../../assets/images";
import { AnchorIcon, BarcodeIcon, LookupIcon, SearchIcon } from "../../assets";

export function SharedTextInput(props) {
    const [scannerActive, setScannerActive] = useState(true);

    return (
        <View style={{ flex: 1 }}>
            {/* {scannerActive ? <BarCodeScanner setScanned={(status) => setScannerActive(status)} scanned={scannerActive} /> : */}
            <View style={styles.container}>
                <View>
                    <Text style={styles.label}>{props.label}</Text>
                    <View style={styles.componentContainer}>
                        <TextInput
                            // style={[styles.sharedInputBox,props.style]}
                            keyboardType={props.keyboardType}
                            name={props.name}
                            placeholder={props.placeholder}
                            value={props.value}
                            onChangeText={(value) => props.onChangeText(props.name, value)}
                            editable={props.editable ? false : true}
                            style={[styles.sharedInputBox, props.style]}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            maxLength={props.maxLength}
                        />
                        {props.isSearch ?
                            <TouchableOpacity style={styles.button} onPress={() => props.onClickSearch(props.name)}>
                                <View style={styles.iconStyle}>
                                    <SearchIcon width="25px" height="30px" fill="#059DCC" />
                                </View>

                            </TouchableOpacity>
                            : null}
                        {props.isLookup ? <TouchableOpacity style={styles.button} onPress={() => props.onClickLookup(props.name)}>
                            <View style={styles.iconStyle}>
                                <LookupIcon width="25px" height="30px" fill="#059DCC" />
                            </View>

                        </TouchableOpacity>
                            : null}

                        {props.isScanner ?
                            <TouchableOpacity style={styles.button} onPress={() => props.onClickScanner(props.name)}>
                                <View style={styles.iconStyle}>
                                    <BarcodeIcon width="25px" height="30px" fill="#059DCC" />
                                </View>

                            </TouchableOpacity>
                            : null}

                        {props.isDefault ?
                            <TouchableOpacity style={styles.button} onPress={() => props.onClickDefault(props.name)}>
                                <View style={styles.iconStyle}>
                                    <AnchorIcon width="25px" height="30px" fill="#059DCC" />
                                </View>

                            </TouchableOpacity>
                            : null}

                    </View>
                </View>
            </View>
        </View>
    )
}

export function TextInputWithIcon(props) {
    return (
        <View>
            <TextInput
                keyboardType={props.keyboardType}
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                style={styles.inputBox}
                secureTextEntry={props.secureTextEntry}
                onChangeText={(value) => props.onChangeText(props.name, value)}
            />
            {props.leftIcon ? (
                <View style={{ position: 'absolute', left: 5, top: '15%' }}>
                    {props.leftIcon}
                </View>
            ) : null}
            {props.rightIcon ? (
                <View style={{ position: 'absolute', right: 5, top: '15%' }}>
                    {props.rightIcon}
                </View>
            ) : null}

        </View>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        borderWidth: 1,
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 8,
        borderColor: '#B5B3B2',
        fontSize: 16,
        flex: 1,
        width: '100%'
    },
    sharedInputBox: {
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        borderColor: '#B5B3B2',
        fontSize: 16,
        textTransform:'uppercase'
    },
    container: {
        flexDirection: 'row'
    },
    componentContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 10
    },
    rightContainer: {
        flex: 0.5,
        justifyContent: 'center',
        marginTop: 15,
        alignItems: 'flex-start',
        flexDirection: 'row',
        padding: 0,
        margin: 0
    },
    label: {
        color: '#A9A9A9',
        fontSize: 16,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 6
    },
    iconStyle: {
        borderWidth: 1,
        borderColor: "#059DCC",
        width: 35,
        height: 40,
        marginTop: 0,
        borderRadius: 10,
        marginLeft: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
})