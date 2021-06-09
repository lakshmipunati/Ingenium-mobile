import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { 
        ModelSelector, 
        PageLoader, 
        RadioBtn, 
        SharedDateTimePicker,
        ExpoModal
    } from '../../components';
import { BarCodeScanner } from '../../components/bar-code-scanner';
import { SharedTextInput } from '../../components/text-input';
import { 
        clearDataFields, 
        defaltValueSetup, 
        lookupByAssetNumberAction, 
        selectedTypeUpdate, 
        udfFieldLookup,
        getUDFDataAction,
        saveForm
    } from '../../redux';
import { anchorIcon, barcodeCamera } from "../../assets/images";

import {styles} from "./style"
import { AnchorIcon, BarcodeIcon } from '../../assets';

const { width, height } = Dimensions.get('window');

export const Data = (props) => {

    const [scanned, setScanned] = useState({ activeTab: '', status: false, isUdf: false });
    const reducerData = useSelector((state) => state);

    const { 
            location, 
            assetNumber, 
            defaultValues, 
            selectedConditionCode,
            unitCost,
            productCategory,
            conditionCodeList,
            selectedUDFs,
            udfTypes,
            securityLevel
        } = reducerData.dataTab.entity;

    const dispatch = useDispatch();
    const listitems = conditionCodeList && conditionCodeList.length>0 ? 
                        conditionCodeList.map((i)=>({key: i.key, label: i.label, value: i.value})) 
                        : [];

    useEffect(() => {
        // dispatch(getUDFDataAction());
    },[0]);

    const onChangeText = (name, value, isUdfField=false) => {
        dispatch(selectedTypeUpdate({ title: value, type: name, isUdfField }))
    }

    const onClickScanner = (activeTab, isUdf=false) => {
        setScanned((prev) => ({
            ...prev,
            status: true,
            activeTab,
            isUdf
        }))
    }

    const handleAferScann = (status, data, activeTab, isUdf) => {
        if(isUdf){
            onClickLookup(activeTab, data, isUdf)
        }else{
            dispatch(selectedTypeUpdate({ title: data, type: activeTab, isUdf }))
        }
        setScanned({ status, activeTab: '', isUdf: false })
    }

    const onClickLookup = (name, number, isUdf=false) => {
        if (number && number.trim() !== "") {
            if(isUdf){
                dispatch(udfFieldLookup({name, number}))
            }else{
                dispatch(lookupByAssetNumberAction(number))
            }
        }
    }

    const handleOnclickSearch = (title, isUdfField=false) => {
        props.navigation.navigate({
            name: 'SearchItems',
            title,
            params: { title, isUdfField }
        })
    }

    const onClickDefault = (name) => {
        if (name) {
            dispatch(defaltValueSetup({ status: !defaultValues[name], name }));
        }
    }

    const getInitialValue=()=>{
        const findCode = listitems.filter((i)=>i.value==selectedConditionCode);
        return findCode && findCode[0] ? findCode[0].label : '';
    }

 
   
const handleSetSecurityLevel=(status)=>{
  
    dispatch(clearDataFields())
}

    return (    
        <PageLoader loading={reducerData.dataTab.loading}>              
            {
                scanned.status && scanned.activeTab.trim() !== ""
                    ?
                    <BarCodeScanner 
                        setScanned={(status, data, activeTab, isUdf) => handleAferScann(status, data, activeTab, isUdf)} 
                        activeTab={scanned.activeTab} 
                        isUdf={scanned.isUdf} 
                    />
                    :
                    <View style={[styles.container,
                        securityLevel==="NO ACCESS" ? {backgroundColor: 'rgba(52, 52, 52, 0.3)', opacity: 0.8} : {}

                    ]}>
                        <ScrollView 
                            showsHorizontalScrollIndicator={false} 
                            showsVerticalScrollIndicator={false} 
                            style={styles.scrollContainer}
                        >
                            <View>
                                <View style={styles.inputContainer}>
                                    <SharedTextInput
                                        keyboardType="ascii-capable"
                                        label="Asset Number"
                                        name="assetNumber"
                                        placeholder=""
                                        value={assetNumber ? assetNumber.toString() : ""}
                                        style={{ minWidth: width - 118 }}
                                        onClickScanner={(activeTab) => onClickScanner(activeTab)}
                                        onClickLookup={(name) => onClickLookup(name, assetNumber)}
                                        onChangeText={(name, value) => onChangeText(name, value)}
                                        isLookup
                                        isScanner
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <SharedTextInput
                                        keyboardType="ascii-capable"
                                        label="Location"
                                        name="location"
                                        placeholder=""
                                        style={{
                                            minWidth: width - 159,
                                            borderColor: defaultValues.location ? 'red' : '#B5B3B2',
                                            color: defaultValues.location ? 'red' : 'black',
                                            borderWidth: defaultValues.location ? 2 : 1,
                                        }}
                                        value={location ? location.toString() : ""}
                                        onClickScanner={(activeTab) => onClickScanner(activeTab)}
                                        onChangeText={(name, value) => onChangeText(name, value)}
                                        onClickSearch={(title) => handleOnclickSearch(title)}
                                        onClickDefault={(name) => onClickDefault(name)}
                                        isDefault
                                        isScanner
                                        isSearch
                                    />
                                </View>

                                {listitems && listitems[0] ?
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Condition Code</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <ModelSelector
                                                style={styles.pickerStyle}
                                                selectStyle={{ height: 40, width: 150}}
                                                listItems={listitems}
                                                onChange={(option)=>onChangeText('selectedConditionCode',option.value)}
                                                initValue={getInitialValue()}
                                                isConditionCodeEnable={defaultValues.selectedConditionCode}
                                            /> 
                                        
                                            <TouchableOpacity style={styles.button} onPress={()=>onClickDefault('selectedConditionCode')}>
                                            <View style={styles.iconStyle}>
                                                <AnchorIcon width="25px" height="30px" fill="#059DCC" />
                                            </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                : null}

                                <View style={styles.inputContainer}>
                                    <SharedTextInput
                                        keyboardType="ascii-capable"
                                        label="Unit cost"
                                        name="unitCost"
                                        placeholder=""
                                        style={{ minWidth:width - 36, height: 45}}
                                        value={unitCost ? unitCost.toString() : ''}
                                        editable
                                       
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <SharedTextInput
                                        keyboardType="ascii-capable"
                                        label="Product Category"
                                        name="productCategory"
                                        placeholder=""
                                        style={{ minWidth:width - 36, height: 45}}
                                        value={productCategory ? productCategory.toString() : ""}
                                        onChangeText={(name, value) => onChangeText(name, value)}
                                    />
                                </View>
                   
                                    {selectedUDFs && selectedUDFs.length>0 ? (
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.udfTitle}>User Defined Fields</Text>
                                            {selectedUDFs.map((i, k)=>(
                                                <View key={k} style={styles.inputContainer}>
                                                    {i.fieldType==="TEXT" ? 
                                                        <View style={styles.inputContainer}>
                                                            {udfTypes[i.label] && udfTypes[i.label].length>0 ? (
                                                            <View>
                                                                <Text style={styles.label}>{i.label}</Text>
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <ModelSelector
                                                                        listItems={udfTypes[i.label]}
                                                                        onChange={({label})=>onChangeText(i.label, label, true)}
                                                                        initValue={i.value ? i.value : ""}
                                                                    />
                                                                    <TouchableOpacity style={styles.button} onPress={()=>onClickScanner(i.label, true)}>
                                                                       
                                                                    <View style={styles.iconStyle}>
                                                                        <BarcodeIcon width="25px" height="30px" fill="#059DCC" />
                                                                    </View>
                                                                        
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                            ) : 
                                                            (
                                                                <SharedTextInput
                                                                    keyboardType="ascii-capable"
                                                                    label={i.label}
                                                                    name={i.label}
                                                                    value={i.value ? (i.value).toString() : ""}
                                                                   
                                                                    onChangeText={(name, value) => onChangeText(name, value, true)}
                                                                    style={{ minWidth: width - 76 }}
                                                                    onClickScanner={(activeTab) => onClickScanner(i.label, true)}
                                                                    isScanner
                                                                />
                                                            )
                                                            }
                                                        </View>
                                                    : null}    
                                                     {i.fieldType==="NUMERIC" || i.fieldType==="CURRENCY" ?
                                                          <SharedTextInput
                                                            keyboardType="number-pad"
                                                            label={i.label}
                                                            name={i.label}
                                                            value={i.value ? (i.value).toString() : ""}
                                                            style={{minWidth:width - 36, height: 45}}
                                                            onChangeText={(name, value) => onChangeText(name, value, true)}
                                                         
                                                        />
                                                     : null}
                                                    {i.fieldType==="DATE" ? 
                                                        <SharedDateTimePicker 
                                                            label={i.label}
                                                            name={i.label}
                                                            value={i.value ? i.value : ""}
                                                            handleChangeDate={(name, value) => onChangeText(name, value, true)}
                                                        />
                                                    : null}   

                                                    {i.fieldType==="TRUE/FALSE" ? 
                                                       <View>
                                                            <Text style={styles.label}>{i.label}</Text>
                                                            <View style={{flexDirection: 'row'}}>
                                                                <View style={{flex: 1}}>
                                                                    <RadioBtn 
                                                                        isSelected={i.value==true ? true : false} 
                                                                        label="True" 
                                                                        value={true}
                                                                        name={i.label}
                                                                        handleClickRadio={(name, value)=>onChangeText(name, value, true)}
                                                                    />
                                                                </View>
                                                                <View style={{flex: 1}}>
                                                                    <RadioBtn 
                                                                        isSelected={i.value==false ? true :false} 
                                                                        label="False" 
                                                                        value={false}
                                                                        name={i.label}
                                                                        handleClickRadio={(name, value)=>onChangeText(name, value, true)}
                                                                    />
                                                                </View>                                                            
                                                            </View>
                                                        </View>
                                                    : null}   
                                                                                     
                                                </View>
                                            ))}
                                        </View>
                                    ) : null}
                                 
                               
                                <View style={[styles.inputContainer, styles.btnContainer]}>
                                    <View style={styles.leftContainer}>
                                        {securityLevel==="READ ONLY" ?
                                            <TouchableOpacity style={[styles.btn,{backgroundColor: '#f0eeed'}]} onPress={() => dispatch(saveForm())} disabled={true}>
                                                <Text style={[styles.name, {color: '#a8a6a5'}]}>Save</Text>
                                            </TouchableOpacity>
                                        : 
                                            <TouchableOpacity style={styles.btn} onPress={() => dispatch(saveForm())}>
                                                <Text style={styles.name}>Save</Text>
                                            </TouchableOpacity>
                                        }
                                      
                                    </View>
        
                                    <View style={styles.rightContainer}>
                                        <TouchableOpacity style={styles.btn} onPress={() => dispatch(clearDataFields())}>
                                            <Text style={styles.name}>Clear</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>                 
                            <ExpoModal 
                                modalVisible={securityLevel==="NO ACCESS" ? true : false}
                                hideModalBox={()=>handleSetSecurityLevel('FULL ACCESS')}
                                message="You don't have the permissions!"
                            />                        
                    </View>
            }   
            
        </PageLoader>
    )
}
