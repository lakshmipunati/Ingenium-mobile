import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert, Modal
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  ModelSelector,
  PageLoader,
  RadioBtn,
  SharedDateTimePicker,
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
  updateRelocateForm,
} from '../../redux';
import { anchorIcon, barcodeCamera } from '../../assets/images';
import { LOCATION_VALIDATION, ASSET_NUMBER_VALIDATION, UDF_CONFIRMATION } from '../../config';
import { styles } from './style';
import { AnchorIcon, BarcodeIcon } from '../../assets';

const { width, height } = Dimensions.get('window');

export const Data = (props) => {
  const [scanned, setScanned] = useState({
    activeTab: '',
    status: false,
    isUdf: false,
  });
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
    securityLevel,
    defaultLocation,
  } = reducerData.dataTab.entity;

  const dispatch = useDispatch();
  const listitems =
    conditionCodeList && conditionCodeList.length > 0
      ? conditionCodeList.map((i) => ({
        key: i.key,
        label: i.label,
        value: i.value,
      }))
      : [];

  // selectedConditionCode
  
  const validateForm = async () => {
    var status = false;
    var obj = {};
    if (assetNumber == null || assetNumber.trim() == '') {
      await AsyncAlert('', ASSET_NUMBER_VALIDATION);
    } else if (selectedUDFs && selectedUDFs.length > 0) {
      // console.log('===####selectedConditionCode===', '1');
      obj = {
        AssetNumber: assetNumber,
        Location: location,
        ConditionCode: selectedConditionCode,
        DefaultLocation: defaultLocation
        // selectedConditionCode,
      };
      for (let i = 0; i < selectedUDFs.length; i++) {
        if (
          selectedUDFs[i].value !== undefined &&
          selectedUDFs[i].value !== null &&
          selectedUDFs[i].value !== ''
        ) {
          obj = {
            ...obj,
            [selectedUDFs[i].label]: selectedUDFs[i].value,
          };
          status = true;
        } else {
          const res = await AsyncAlertYesNo(
            '',
            selectedUDFs[i].label +
            UDF_CONFIRMATION,
          );
          obj = {
            ...obj,
            [selectedUDFs[i].label]: selectedUDFs[i].value
              ? selectedUDFs[i].value
              : '',
          };
          status = res;
          if (res === false) {
            obj = {
              ...obj,
              [selectedUDFs[i].label]: "null"
            }
            status = true;
            //return status;
          }
        }
      }
    } else {
      status = true;
      obj = {
        AssetNumber: assetNumber,
        Location: location,
        ConditionCode: selectedConditionCode,
        DefaultLocation: defaultLocation,
      };
    }

    return { status, obj: status == true ? obj : {} };
  };

  const handleValidateSaveForm = async () => {
    const res = await validateForm();
    if (res && res.status && res.obj) {
      dispatch(updateRelocateForm(res.obj)).then(({ payload }) => {
        if (payload && payload.message) {
          setTitleText(payload.message);
          if (payload.data && payload.data === true) {
            dispatch(clearDataFields());
          }
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
          }, 2000);
          // AsyncAlert('', payload.message);
        }
      });
    }
  };

  const AsyncAlertYesNo = (title, msg) =>
    new Promise((resolve) => {
      Alert.alert(
        title,
        msg,
        [
          {
            text: 'Yes',
            onPress: () => {
              resolve(true);
            },
          },
          {
            text: 'No',
            onPress: () => {
              resolve(false);
            },
          },
        ],
        { cancelable: false },
      );
    });

  const AsyncAlert = (title, msg) =>
    new Promise((resolve) => {
      Alert.alert(
        title,
        msg,
        [
          {
            text: 'ok',
            onPress: () => {
              resolve('ok');
            },
          },
        ],
        { cancelable: false },
      );
    });

  useEffect(() => {
    // dispatch(getUDFDataAction());
  }, [0]);

  const onChangeText = (name, value, isUdfField = false, fieldType = null) => {
    if (fieldType == 'TEXT') {
      value = value.toUpperCase();
    }
    dispatch(selectedTypeUpdate({ title: value, type: name, isUdfField }));
  };

  const onBlur = (value, name, isUdfField = false, fieldType = null) => {
    let updatedValue;
    if (fieldType == 'CURRENCY') {
      updatedValue = parseFloat(value).toFixed(2);
      dispatch(selectedTypeUpdate({ title: updatedValue, type: name, isUdfField }));
    }
  }

  const onClickScanner = (activeTab, isUdf = false, isVerifyData = false) => {
    setScanned((prev) => ({
      ...prev,
      status: true,
      activeTab,
      isUdf,
      isVerifyData,
    }));
  };

  const handleAferScann = (status, data, activeTab, isUdf, isVerifyData) => {
    if (isUdf) {
      onClickLookup(activeTab, data, isUdf, isVerifyData);
    } else {
      dispatch(selectedTypeUpdate({ title: data, type: activeTab, isUdf }));
    }
    setScanned({ status, activeTab: '', isUdf: false, isVerifyData: false });
  };

  const onClickLookup = (name, number, isUdf = false, isVerifyData = false) => {
    if (number && number.trim() !== '') {
      if (isUdf) {
        dispatch(udfFieldLookup({ name, number, isVerifyData }));
      } else {
        dispatch(lookupByAssetNumberAction(number));
      }
    }
  };

  const handleOnclickSearch = (title, value = null, udfList, isUdfField = false) => {
    props.navigation.navigate({
      name: 'SearchItems',
      title,
      params: { title, isUdfField, value, udfList },
    });
  };

  const onClickDefault = (name) => {
    if (name) {
      dispatch(defaltValueSetup({ status: !defaultValues[name], name }));
    }
  };

  const getInitialValue = () => {
    const findCode = listitems.filter((i) => i.value == selectedConditionCode);
    return findCode && findCode[0] ? findCode[0].label : '';
  };

  const handleSetSecurityLevel = (status) => {
    dispatch(clearDataFields());
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [titleText, setTitleText] = useState('');
  //   console.log('==securityLevel===', securityLevel);
  return (
    <PageLoader loading={reducerData.dataTab.loading}>
      {scanned.status && scanned.activeTab.trim() !== '' ? (
        <BarCodeScanner
          setScanned={(status, data, activeTab, isUdf, isVerifyData) =>
            handleAferScann(status, data, activeTab, isUdf, isVerifyData)
          }
          activeTab={scanned.activeTab}
          isUdf={scanned.isUdf}
          isVerifyData={scanned.isVerifyData}
        />
      ) : (
        <View
          style={[
            styles.container,
            securityLevel === 'NO ACCESS'
              ? { backgroundColor: 'rgba(52, 52, 52, 0.3)', opacity: 0.8 }
              : {},
          ]}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.scrollContainer}
          >
            <View>
              <View style={styles.inputContainer}>
                <SharedTextInput
                  keyboardType='ascii-capable'
                  label='Asset Number'
                  name='assetNumber'
                  placeholder=''
                  value={assetNumber ? assetNumber.toString() : ''}
                  style={{ minWidth: width - 118 }}
                  onClickScanner={(activeTab) => onClickScanner(activeTab)}
                  onClickLookup={(name) => onClickLookup(name, assetNumber)}
                  onChangeText={(name, value) => onChangeText(name, value)}
                  onBlur={(name, value) =>
                    onBlur(name, value)
                  }
                  isLookup
                  isScanner
                />
              </View>
              <View style={styles.inputContainer}>
                <SharedTextInput
                  keyboardType='ascii-capable'
                  label='Location'
                  name='location'
                  placeholder=''
                  style={{
                    minWidth: width - 159,
                    borderColor: defaultValues.location ? 'red' : '#B5B3B2',
                    color: defaultValues.location ? 'red' : 'black',
                    borderWidth: defaultValues.location ? 2 : 1,
                  }}
                  value={location ? location.toString() : ''}
                  onClickScanner={(activeTab) => onClickScanner(activeTab)}
                  onChangeText={(name, value) => onChangeText(name, value)}
                  onClickSearch={(title) => handleOnclickSearch(title, location, null)}
                  onClickDefault={(name) => onClickDefault(name)}
                  onBlur={(name, value) =>
                    onBlur(name, value)
                  }
                  isDefault
                  isScanner
                  isSearch
                />
              </View>

              {listitems && listitems[0] ? (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Condition Code</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <ModelSelector
                      style={styles.pickerStyle}
                      selectStyle={{ height: 40, width: 150 }}
                      listItems={listitems}
                      onChange={(option) =>
                        onChangeText('selectedConditionCode', option.value)
                      }
                      initValue={getInitialValue()}
                      isConditionCodeEnable={
                        defaultValues.selectedConditionCode
                      }
                    />

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => onClickDefault('selectedConditionCode')}
                    >
                      <View style={styles.iconStyle}>
                        <AnchorIcon width='25px' height='30px' fill='#059DCC' />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}

              <View style={styles.inputContainer}>
                <SharedTextInput
                  keyboardType='ascii-capable'
                  label='Unit cost'
                  name='unitCost'
                  placeholder=''
                  style={{ minWidth: width - 36, height: 45 }}
                  value={unitCost ? unitCost.toString() : ''}
                  editable
                />
              </View>
              <View style={styles.inputContainer}>
                <SharedTextInput
                  keyboardType='ascii-capable'
                  label='Product Category'
                  name='productCategory'
                  placeholder=''
                  style={{ minWidth: width - 36, height: 45 }}
                  editable
                  value={productCategory ? productCategory.toString() : ''}
                  onChangeText={(name, value) => onChangeText(name, value)}
                  onBlur={(name, value) =>
                    onBlur(name, value)
                  }
                />
              </View>
              {selectedUDFs && selectedUDFs.length == 0 ? (
                <View style={styles.inputContainer}>
                  <Text style={styles.noUdf}>NO UDF Data</Text>
                </View>
              ) : null}
              {selectedUDFs && selectedUDFs.length > 0 ? (
                <View style={styles.inputContainer}>
                  <Text style={styles.udfTitle}>User Defined Fields</Text>
                  {selectedUDFs.map((i, k) => (
                    <View key={k} style={styles.inputContainer}>
                      {i.fieldType === 'TEXT' && i.verifyData == true ? (
                        <View style={styles.inputContainer}>
                          {udfTypes[i.label] && udfTypes[i.label].length > 0 ? (
                            <View>
                              <Text style={styles.label}>{i.label}</Text>
                              <View style={{ flexDirection: 'row' }}>
                                <ModelSelector
                                  listItems={udfTypes[i.label]}
                                  onChange={({ label }) =>
                                    onChangeText(i.label, label, true)
                                  }
                                  initValue={i.value ? i.value : ''}
                                />
                                <TouchableOpacity
                                  style={styles.button}
                                  onPress={() => onClickScanner(i.label, true, i.verifyData)}
                                >
                                  <View style={styles.iconStyle}>
                                    <BarcodeIcon
                                      width='25px'
                                      height='30px'
                                      fill='#059DCC'
                                    />
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          ) : (
                            <SharedTextInput
                              keyboardType='ascii-capable'
                              label={i.label}
                              name={i.label}
                              value={i.value ? i.value.toString() : ''}
                              onChangeText={(name, value) =>
                                onChangeText(name, value, true, i.fieldType)
                              }
                              onBlur={(name, value) =>
                                onBlur(name, value, true, i.fieldType)
                              }
                              maxLength={i.maxLength}
                              //style={{ minWidth: width - 79 }}
                              style={{ width: '87%' }}
                              onClickScanner={(activeTab) =>
                                onClickScanner(i.label, true, i.verifyData)
                              }
                              isScanner
                            />
                          )}
                        </View>
                      )
                        : null
                      }

                      {i.fieldType === 'TEXT' && i.verifyData == false ? (
                        <View style={styles.inputContainer}>
                          <View>
                            {/* <Text style={styles.label}>{i.label}</Text> */}
                            <View style={{ flexDirection: 'row' }}>
                              <SharedTextInput
                                keyboardType='ascii-capable'
                                label={i.label}
                                name={i.label}
                                value={i.value ? i.value.toString() : ''}
                                onChangeText={(name, value) =>
                                  onChangeText(name, value, true, i.fieldType)
                                }
                                onBlur={(name, value) =>
                                  onBlur(name, value, true, i.fieldType)
                                }
                                maxLength={i.maxLength}
                                //style={{ minWidth: width - 79 }}
                                style={{ minWidth: width - 120 }}
                                onClickScanner={(activeTab) =>
                                  onClickScanner(i.label, true, i.verifyData)
                                }
                                onClickSearch={(title) => handleOnclickSearch(title, i.value, udfTypes[i.label], true)}
                                isScanner
                                isSearch
                              />
                            </View>
                          </View>
                        </View>
                      )
                        : null
                      }

                      {i.fieldType == 'NUMERIC' ||
                        i.fieldType == 'CURRENCY' ? (
                        <SharedTextInput
                          keyboardType='number-pad'
                          label={i.label}
                          name={i.label}
                          value={i.value ? i.value.toString() : ''}
                          style={{ minWidth: width - 36, height: 45 }}
                          //maxLength={i.maxLength}
                          onChangeText={(name, value) =>
                            onChangeText(name, value, true, i.fieldType)
                          }
                          onBlur={(name, value) =>
                            onBlur(name, value, true, i.fieldType)
                          }
                        />
                      ) : null}
                      {i.fieldType === 'DATE' ? (
                        <SharedDateTimePicker
                          label={i.label}
                          name={i.label}
                          value={i.value ? i.value : ''}
                          handleChangeDate={(name, value) =>
                            onChangeText(name, value, true, i.fieldType)
                          }
                        />
                      ) : null}

                      {i.fieldType === 'TRUE/FALSE' ? (
                        <View>
                          <Text style={styles.label}>{i.label}</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                              <RadioBtn
                                isSelected={
                                  i.value !== '' &&
                                    i.value !== undefined &&
                                    i.value == true
                                    ? true
                                    : false
                                }
                                label='True'
                                value={true}
                                name={i.label}
                                handleClickRadio={(name, value) =>
                                  onChangeText(name, value, true, i.fieldType)
                                }
                              />
                            </View>
                            <View style={{ flex: 1 }}>
                              <RadioBtn
                                isSelected={
                                  i.value !== '' &&
                                    i.value !== undefined &&
                                    i.value == false
                                    ? true
                                    : false
                                }
                                label='False'
                                value={false}
                                name={i.label}
                                handleClickRadio={(name, value) =>
                                  onChangeText(name, value, true, i.fieldType)
                                }
                              />
                            </View>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  ))}
                </View>
              ) : null}

              <View style={[styles.inputContainer, styles.btnContainer]}>
                <View style={styles.leftContainer}>
                  {securityLevel === 'READ ONLY' ? (
                    <TouchableOpacity
                      style={[styles.btn, { backgroundColor: '#f0eeed' }]}
                      onPress={() => dispatch(saveForm())}
                      disabled={true}
                    >
                      <Text style={[styles.name, { color: '#a8a6a5' }]}>
                        Save
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    // <TouchableOpacity style={styles.btn} onPress={() => dispatch(saveForm())}>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => handleValidateSaveForm()}
                    >
                      <Text style={styles.name}>Save</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.rightContainer}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => dispatch(clearDataFields())}
                  >
                    <Text style={styles.name}>Clear</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onBackdropPress={() => {
                setModalVisible(false);
              }}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.modalText}>
                    <Text style={styles.textStyle} >{titleText}</Text>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      )}
    </PageLoader>
  );
};
