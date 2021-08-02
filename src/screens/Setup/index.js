import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  ModelSelector,
  PageLoader,
  RadioBtn,
  SharedDateTimePicker,
  SharedTextInput,
} from '../../components';
import {
  udfSelectedAction,
  removeSelectedUDFAction,
  clearAllUDFSelected,
  getSelectedUDFFieldData,
  selectedTypeUpdate,
} from '../../redux';
import { CloseIcon } from '../../assets';

const { width } = Dimensions.get('screen');

export const Setup = (props) => {
  let udfSelected = '';
  const dispatch = useDispatch();

  const reducerData = useSelector((state) => state.dataTab);

  const { UDFLookupList, selectedUDFs, udfTypes } = reducerData.entity;

  const UDFLookupListItems = UDFLookupList.map((item) => {
    return { key: item.key, label: item.label, fieldType: item.fieldType , maxLength: item.fieldLength};
  });

  const deleteUDF = (selectedUDFObj) => {
    dispatch(removeSelectedUDFAction(selectedUDFObj));
  };

  const changeUDF = (selectedId) => {
    udfSelected = selectedId;
  };

  const clearAllUDFs = () => {
    dispatch(clearAllUDFSelected());
  };

  const saveUDF = () => {
    if (
      selectedUDFs.length > 0 &&
      !selectedUDFs.find((item) => item.key == udfSelected.key)
    ) {
      if (udfSelected !== '') {
        dispatch(udfSelectedAction(udfSelected));
      }
    } else if (selectedUDFs.length == 0 && udfSelected == '') {
      udfSelected = UDFLookupListItems[0];
      dispatch(udfSelectedAction(udfSelected));
    } else if (selectedUDFs.length == 0) {
      dispatch(udfSelectedAction(udfSelected));
    }
  };

  const onChangeText = (name, value, isUdfField = false) => {
    dispatch(selectedTypeUpdate({ title: value, type: name, isUdfField }));
  };

  const getInitialValue = () => {
    if (UDFLookupListItems && UDFLookupListItems[0]) {
      return UDFLookupListItems[0].label;
    } else {
      return '';
    }
  };

  return (
    <PageLoader loading={reducerData.loading}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View>
            <Text style={styles.textClr}>User Defined Field</Text>
            <ModelSelector
              listItems={UDFLookupListItems}
              onChange={changeUDF}
              initValue={getInitialValue()}
            />
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  { marginRight: 5, backgroundColor: '#059DCC' },
                ]}
                onPress={() => saveUDF()}
              >
                <Text style={[styles.name, { color: '#fff' }]}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { marginLeft: 5 }]}
                onPress={() => clearAllUDFs()}
              >
                <Text style={styles.name}>Remove All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.udfCoontainer}>
              {selectedUDFs &&
                selectedUDFs.map((field, index) => {
                  return (
                    <View key={index} style={styles.fieldContainer}>
                      {field.fieldType == 'TEXT' ? (
                        udfTypes[field.label].length > 0 ? (
                          <View style={{ flex: 1 }}>
                            <Text style={styles.label}>{field.label}</Text>
                            <ModelSelector
                              listItems={udfTypes[field.label]}
                              onChange={({ label }) =>
                                onChangeText(field.label, label, true)
                              }
                              initValue=''
                              selectTextStyle={{ fontSize: 13 }}
                            />
                          </View>
                        ) : (
                          <View style={{ flex: 1, marginTop: -15 }}>
                            <SharedTextInput
                              keyboardType='ascii-capable'
                              label={field.label}
                              name={field.label}
                              placeholder=''
                              style={{ minWidth: width - 90, height: 40 }}
                              value={field.value ? field.value : ''}
                              maxLength={field.maxLength}
                              onChangeText={(name, value) =>
                                onChangeText(name, value, true)
                              }
                            />
                          </View>
                        )
                      ) : null}
                      {/* <Text style={styles.listElement} key={index}>
                      {field.label}
                    </Text>
                    {field.fieldType == "TEXT" ? 
                    udfTypes[field.label].length>0 ? 
                    (
                      <View style={{flex: 1.2}}>
                      <ModelSelector
                        listItems={udfTypes[field.label]}
                        onChange={({label})=>onChangeText(field.label,label, true)}
                        initValue={field.value ? field.value : ''}
                        selectTextStyle={{fontSize: 13, color: 'black'}}
                      />
                      </View>
                    ) :  
                    (
                      <View style={{flex: 1.2}}>
                      <SharedTextInput
                          keyboardType="ascii-capable"
                          label=""
                          name={field.label}
                          placeholder=""
                          style={{ 
                            minWidth:width - 200, 
                            height: 40, 
                            marginTop: -20,
                            width: '100%',
                          }}
                          value={field.value ? field.value.toString() : ""}
                          onChangeText={(name, value) => onChangeText(name, value, true)}
                      />
                      </View>
                    )
                    : null} */}

                      {field.fieldType == 'CURRENCY' ||
                      field.fieldType == 'NUMERIC' ? (
                        <View
                          style={{
                            flex: 1.2,
                            marginTop: -15,
                            position: 'relative',
                          }}
                        >
                          {field.fieldType == 'CURRENCY' ? (
                            <Text style={styles.currencyText}>$</Text>
                          ) : null}
                          <SharedTextInput
                            keyboardType='number-pad'
                            label={field.label}
                            name={field.label}
                            placeholder=''
                            style={{
                              width: '100%',
                              height: 40,
                              marginTop: 0,
                              paddingLeft:
                                field.fieldType == 'CURRENCY' ? 15 : 10,
                            }}
                            // style={{ minWidth: width - 90, height: 40 }}
                            value={field.value ? parseFloat(field.value).toFixed(2) : ''}
                            onChangeText={(name, value) =>
                              onChangeText(name, value, true)
                            }
                          />
                        </View>
                      ) : null}

                      {field.fieldType === 'DATE' ? (
                        <View style={{ flex: 1, marginTop: -15 }}>
                          <SharedDateTimePicker
                            label={field.label}
                            name={field.label}
                            value={field.value ? field.value : ''}
                            handleChangeDate={(name, value) =>
                              onChangeText(name, value, true)
                            }
                          />
                        </View>
                      ) : null}

                      {/* {field.fieldType == 'CURRENCY' ||
                      field.fieldType == 'NUMERIC' ? (
                        <View style={{ flex: 1.2, position: 'relative' }}>
                          {field.fieldType == 'CURRENCY' ? (
                            <Text style={styles.currencyText}>$</Text>
                          ) : null}

                          <SharedTextInput
                            keyboardType='number-pad'
                            label=''
                            name={field.label}
                            placeholder=''
                            style={{
                              width: '100%',
                              height: 40,
                              marginTop: -20,
                              paddingLeft:
                                field.fieldType == 'CURRENCY' ? 15 : 10,
                            }}
                            value={field.value ? field.value.toString() : ''}
                            onChangeText={(name, value) =>
                              onChangeText(name, value, true)
                            }
                            maxLength={field.fieldType == 'CURRENCY' ? 18 : 500}
                          />
                        </View>
                      ) : null} */}

                      {/* {field.fieldType === 'DATE' ? (
                        <View style={{ flex: 1.2, marginTop: -30 }}>
                          <SharedDateTimePicker
                            label=''
                            name={field.label}
                            value={field.value ? field.value.toString() : ''}
                            handleChangeDate={(name, value) =>
                              onChangeText(name, value, true)
                            }
                          />
                        </View>
                      ) : null} */}

                      {field.fieldType === 'TRUE/FALSE' ? (
                        <View style={{ flex: 1, marginTop: 0 }}>
                          <Text style={styles.label}>{field.label}</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <View>
                              <RadioBtn
                                isSelected={field.value == true ? true : false}
                                label='True'
                                name={field.label}
                                value={true}
                                handleClickRadio={(name, value) =>
                                  onChangeText(name, value, true)
                                }
                              />
                            </View>
                            <View style={{ marginLeft: width - 250 }}>
                              <RadioBtn
                                isSelected={
                                  field.value === false ? true : false
                                }
                                label='False'
                                name={field.label}
                                value={false}
                                handleClickRadio={(name, value) =>
                                  onChangeText(name, value, true)
                                }
                              />
                            </View>
                          </View>
                        </View>
                      ) : null}

                      {/* {field.fieldType === 'TRUE/FALSE' ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1.2,
                            marginTop: 10,
                          }}
                        >
                          <View>
                            <RadioBtn
                              isSelected={field.value == true ? true : false}
                              label='True'
                              name={field.label}
                              value={true}
                              handleClickRadio={(name, value) =>
                                onChangeText(name, value, true)
                              }
                            />
                          </View>
                          <View style={{ marginLeft: 30 }}>
                            <RadioBtn
                              isSelected={field.value === false ? true : false}
                              label='False'
                              name={field.label}
                              value={false}
                              handleClickRadio={(name, value) =>
                                onChangeText(name, value, true)
                              }
                            />
                          </View>
                        </View>
                      ) : null} */}
                      <TouchableOpacity
                        onPress={() => deleteUDF(field)}
                        style={{
                          marginLeft: 10,
                          textAlign: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 0.1,
                        }}
                      >
                        <CloseIcon height='40px' width='25px' fill='#059DCC' />
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </View>
          </View>
        </ScrollView>
      </View>
    </PageLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: 'white',
  },
  label: {
    color: '#A9A9A9',
    fontSize: 16,
  },
  textClr: {
    color: '#A9A9A9',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  udfCoontainer: {
    marginTop: 25,
  },
  fieldContainer: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  btn: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    flex: 1,
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
    marginLeft: 4,
  },
  listElement: {
    padding: 10,
    flex: 0.6,
    borderRadius: 20,
  },
  currencyText: {
    color: '#A9A9A9',
    position: 'absolute',
    top: 30,
    left: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
