import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BarCodeScanner } from '../../components/bar-code-scanner';
import { SharedTextInput } from '../../components/text-input';
import { lookupByAssetNumberAction } from '../../redux';

export const Data = (props) => {
    const init = {
        assetNumber: '',
        location: '',
        descriptionID: ''
    }
    const [state, setState]=useState(init);
    const [scanned, setScanned] = useState({activeTab: '', status: false});
    const reducerData = useSelector((state)=>state.dataTab);
    const {location, descriptionID, errorMsg} = reducerData.entity;
    const dispatch = useDispatch();

    if(reducerData.errorMsg){
        Alert.alert(reducerData.errorMsg)
    }
  
    const onChangeText=(name, value)=>{
        setState((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const onClickScanner=(activeTab)=>{
        setScanned((prev)=>({
            ...prev,
            status: true,
            activeTab
        }))
    }

    const handleAferScann=(status, data, activeTab)=>{
        setState((prev)=>({
            ...prev,
            [activeTab]: data
        }));
        setScanned({status, activeTab: ''})
    }

    const onClickLookup=(name)=>{
        if(state[name] && (state[name]).trim()!==""){
            dispatch(lookupByAssetNumberAction(state[name]))
        }
    }

    return (
        <View style={{flex: 1}}>
            {
                scanned.status && scanned.activeTab.trim() !== ""
                ? 
                <BarCodeScanner setScanned={(status, data, activeTab) => handleAferScann(status, data, activeTab)} activeTab={scanned.activeTab} /> 
                :
                <View style={styles.container}>
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
                        <View>
                            <View style={styles.inputContainer}>
                                <SharedTextInput
                                    label="Asset Number"
                                    name="assetNumber"
                                    placeholder="Asset Number" 
                                    value={state.assetNumber}
                                    style={{minWidth: 262}}
                                    onClickScanner={(activeTab)=>onClickScanner(activeTab)}
                                    onClickLookup={(name)=>onClickLookup(name)}
                                    onChangeText={(name, value)=>onChangeText(name, value)}
                                    isLookup
                                    isScanner
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <SharedTextInput
                                    label="Description ID"
                                    name="descriptionID"
                                    placeholder="Description ID" 
                                    value={descriptionID && descriptionID !=="" ? descriptionID.toString() : state.descriptionID}
                                    onChangeText={(name, value)=>onChangeText(name, value)}
                                    onClickLookup
                                    style={{minWidth: 262}}
                                    isLookup
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <SharedTextInput
                                    label="Location"
                                    name="location"
                                    placeholder="Location" 
                                    style={{minWidth: 221}}
                                    value={ location && location!== "" ? location : state.location}
                                    onClickScanner={(activeTab)=>onClickScanner(activeTab)}
                                    onChangeText={(name, value)=>onChangeText(name, value)}
                                    isDefault
                                    isScanner
                                    isSearch
                                />
                            </View>               
                            <View style={[styles.inputContainer,styles.btnContainer]}>
                                <View style={styles.leftContainer}>
                                    <TouchableOpacity style={styles.btn}>
                                        <Text style={styles.name}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rightContainer}>
                                    <TouchableOpacity style={styles.btn}>
                                        <Text style={styles.name}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>  
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        width: '100%',
    },
    rightContainer:{
        flex: 1,
        paddingLeft: 5
    },
    leftContainer: {
        flex: 1,
        paddingRight: 5
    },
    btnContainer:{
        flexDirection: 'row'
    },
    name: {
        textAlign: 'center',
        color: 'black',
        fontSize: 18
    },
    container: {
        flex: 1,
        padding: 18,
        backgroundColor: "white",
    },
    inputContainer: {
        marginTop: 10,
    },
})