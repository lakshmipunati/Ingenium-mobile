import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ModelSelector, PageLoader, RadioBtn, SharedDateTimePicker } from '../../components';
import { BarCodeScanner } from '../../components/bar-code-scanner';
import { SharedTextInput } from '../../components/text-input';
import { 
        clearDataFields, 
        defaltValueSetup, 
        lookupByAssetNumberAction, 
        selectedTypeUpdate, 
        getUDFDataAction,
        udfFieldLookup
    } from '../../redux';
import { anchorIcon } from "../../assets/images";

import {styles} from "./style"

const { width, height } = Dimensions.get('screen');

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
            UDFList
        } = reducerData.dataTab.entity;

    const dispatch = useDispatch();
    const listitems = conditionCodeList && conditionCodeList.length>0 ? 
                        conditionCodeList.map((i)=>({key: i.key, label: i.label, value: i.value})) 
                        : [];

    useEffect(() => {
        dispatch(getUDFDataAction());
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
        return findCode && findCode[0] ? findCode[0].label : listitems[0].label;
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
                    <View style={styles.container}>
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
                            <View>
                                <View style={styles.inputContainer}>
                                    <SharedTextInput
                                        keyboardType="ascii-capable"
                                        label="Asset Number"
                                        name="assetNumber"
                                        placeholder=""
                                        value={assetNumber}
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
                                        value={location}
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
                                                <Image style={styles.iconStyle} source={anchorIcon} />
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
                                        value={unitCost}
                                        editable
                                       
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <SharedTextInput
                                        keyboardType="number-pad"
                                        label="Product Category"
                                        name="productCategory"
                                        placeholder=""
                                        style={{ minWidth:width - 36, height: 45}}
                                        value={productCategory}
                                        onChangeText={(name, value) => onChangeText(name, value)}
                                    />
                                </View>
                   
                                    {selectedUDFs && selectedUDFs.length>0 ? (
                                        <View style={styles.inputContainer}>
                                            <Text style={styles.udfTitle}>User Defined Fields</Text>
                                            {selectedUDFs.map((i, k)=>(
                                                <View style={styles.inputContainer}>
                                                    {i.fieldType==="TEXT" || i.fieldType==="NUMERIC" || i.fieldType==="CURRENCY" ? 
                                                        <SharedTextInput
                                                            keyboardType={i.fieldType==="NUMERIC" || i.fieldType==="CURRENCY" ? "number-pad" :  "ascii-capable"}
                                                            label={i.label}
                                                            name={i.label}
                                                            value={i.value ? i.value : ""}
                                                            style={i.fieldType==="NUMERIC" || i.fieldType==="CURRENCY" ? { minWidth:width - 36, height: 45} :{ minWidth: width - 118 }}
                                                            onClickScanner={(activeTab) => onClickScanner(activeTab, true)}
                                                            onClickSearch={(title) => handleOnclickSearch(title, true)}
                                                            onChangeText={(name, value) => onChangeText(name, value, true)}
                                                            isSearch={i.fieldType==="NUMERIC" || i.fieldType==="CURRENCY" ? false : true}
                                                            isScanner={i.fieldType==="NUMERIC" || i.fieldType==="CURRENCY" ? false :true}
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
                                                                        isSelected={i.value=='True' ? true : false} 
                                                                        label="True" 
                                                                        name={i.label}
                                                                        handleClickRadio={(name, value)=>onChangeText(name, value, true)}
                                                                    />
                                                                </View>
                                                                <View style={{flex: 1}}>
                                                                    <RadioBtn 
                                                                        isSelected={i.value==="False" ? true : false} 
                                                                        label="False" 
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
                                        <TouchableOpacity style={styles.btn}>
                                            <Text style={styles.name}>Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.rightContainer}>
                                        <TouchableOpacity style={styles.btn} onPress={() => dispatch(clearDataFields())}>
                                            <Text style={styles.name}>Clear</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
            }     
        </PageLoader>
    )
}

