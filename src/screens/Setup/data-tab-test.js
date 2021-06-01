import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ModelSelector, PageLoader, RadioBtn, SharedDateTimePicker, SharedTextInput } from '../../components';
import { 
        udfSelectedAction, 
        removeSelectedUDFAction, 
        clearAllUDFSelected, 
        getSelectedUDFFieldData,
        selectedTypeUpdate,
        
      } from '../../redux';
import { CloseIcon } from '../../assets';

const {width} = Dimensions.get('screen');

export const Setup = (props) => {

  let udfSelected = '';
  const dispatch = useDispatch();

  const reducerData = useSelector((state) => state.dataTab);

  const { UDFLookupList, selectedUDFs, udfTypes } = reducerData.entity;

  const UDFLookupListItems = UDFLookupList.map((item) => {
    return ({ key: item.key, label: item.label, fieldType: item.fieldType })
  });

  const deleteUDF = (selectedUDFObj) => {
    dispatch(removeSelectedUDFAction(selectedUDFObj))
  }

  const changeUDF = (selectedId) => {
    udfSelected = selectedId;
  }

  const clearAllUDFs = () => {
    dispatch(clearAllUDFSelected());
  }

  const saveUDF = () => {
    if (selectedUDFs.length > 0 && !selectedUDFs.find((item) => item.key == udfSelected.key)) {
      dispatch(udfSelectedAction(udfSelected))
    } else if (selectedUDFs.length == 0 && udfSelected == "") {
      udfSelected = UDFLookupListItems[0]
      dispatch(udfSelectedAction(udfSelected));
    } else if (selectedUDFs.length == 0) {
      dispatch(udfSelectedAction(udfSelected));
    }
  }

  const onChangeText = (name, value, isUdfField=false) => {
    dispatch(selectedTypeUpdate({ title: value, type: name, isUdfField }))
}

  const getInitialValue=()=>{
    if(UDFLookupListItems && UDFLookupListItems[0]){
      return UDFLookupListItems[0].label
    }else{
      return ""
    }
  }
  return (
    <PageLoader loading={reducerData.loading}>
    <View style={styles.container}>
      <ScrollView>
        <View >
          <Text style={styles.textClr}>User Defined Field</Text>
          <ModelSelector 
              listItems={UDFLookupListItems} 
              onChange={changeUDF} 
              initValue={getInitialValue()}
          />
          <View style={styles.inputContainer}>
            <TouchableOpacity style={[styles.btn, {marginRight: 5, backgroundColor: '#059DCC'}]} onPress={() => saveUDF()} >
              <Text style={[styles.name, {color: '#fff'}]}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn,{marginLeft: 5}]} onPress={() => clearAllUDFs()} >
              <Text style={styles.name}>Remove All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.udfCoontainer}>
            {selectedUDFs &&
              selectedUDFs.map((field, index) => {
                return (
                  <View key={index} style={styles.fieldContainer}>
                    {/* <Text style={styles.listElement} key={index}>
                      {field.label}
                    </Text> */}
                    {field.fieldType == "TEXT" ? 
                    udfTypes[field.label].length>0 ? 
                    (
                      <View style={{flex: 1, marginTop: -10}}>
                        <Text style={styles.label}>{field.label}</Text>
                      <ModelSelector
                        listItems={udfTypes[field.label]}
                        onChange={({label})=>onChangeText(field.label,label, true)}
                        initValue=""
                        selectTextStyle={{fontSize: 13}}
                      />
                      </View>
                    ) :  
                    (
                      <View style={{ marginTop: -15}}>
                      <SharedTextInput
                          keyboardType="ascii-capable"
                          label={field.label}
                          name={field.label}
                          placeholder=""
                          style={{ minWidth:width - 90, height: 40}}
                          value={field.value ? field.value : ""}
                          onChangeText={(name, value) => onChangeText(name, value, true)}
                      />
                      </View>
                    )
                    : null}

                    {field.fieldType == "CURRENCY" || field.fieldType== "NUMERIC" ? 
                     <View style={{ marginTop: -15}}>
                      <SharedTextInput
                          keyboardType="number-pad"
                          label={field.label}
                          name={field.label}
                          placeholder=""
                          style={{ minWidth:width - 90, height: 40}}
                          value={field.value ? field.value : ""}
                          onChangeText={(name, value) => onChangeText(name, value, true)}
                      />
                      </View>
                    : null }
                   
                   {field.fieldType==="DATE" ? 
                    <View style={{ marginTop: -15}}>
                      <SharedDateTimePicker
                          label={field.label}
                          name={field.label}
                          value={field.value ? field.value : ""}
                          handleChangeDate={(name, value) => onChangeText(name, value, true)}
                      />
                      </View>
                  : null}  

                    {field.fieldType==="TRUE/FALSE" ? 
                    <View style={{ flex: 1, marginTop: -15}}>
                       <Text style={styles.label}>{field.label}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <RadioBtn 
                                      isSelected={field.value=='True' ? true : false} 
                                      label="True" 
                                      name={field.label}
                                      handleClickRadio={(name, value)=>onChangeText(name, value, true)}
                                    />
                                </View>
                                <View style={{marginLeft: width-250}}>
                                    <RadioBtn 
                                      isSelected={field.value==="False" ? true : false} 
                                      label="False" 
                                      name={field.label}
                                      handleClickRadio={(name, value)=>onChangeText(name, value, true)}
                                    />
                                </View>                                                            
                              </View>
                        </View>
                      : null} 
                    <TouchableOpacity onPress={() => deleteUDF(field)} style={{marginLeft: 20, textAlign: 'center'}}>
                      <CloseIcon height="45px" width="15px" fill="black" />
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </View>
    </PageLoader>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "white",
  },
  textClr: {
    color: '#A9A9A9',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  udfCoontainer:{
    marginTop: 25
  },
  fieldContainer: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  btn: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: 'center',
    flex: 1
  },
  name: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
  cancel_icon: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginTop: 4,
    marginLeft: 4
  },
  label:{
    color: '#A9A9A9',
    fontSize: 16,
  },
  listElement: {
    padding: 10,
    flex: 0.5,
    borderRadius: 20
  }
})