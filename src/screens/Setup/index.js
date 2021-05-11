import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ModelSelector } from '../../components';
import { crossIcon } from '../../assets/images';
import { udfSelectedAction, removeSelectedUDFAction, clearAllUDFSelected } from '../../redux';

export const Setup = (props) => {

  let udfSelected = '';
  const dispatch = useDispatch();

  const reducerData = useSelector((state) => state.dataTab);
  const { UDFLookupList, selectedUDFs } = reducerData.entity;

  const UDFLookupListItems = UDFLookupList.map((item) => (
    { key: item.value, label: item.label, fieldType: item.fieldType }
  ));

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
    // debugger
    if (selectedUDFs.length > 0 && !selectedUDFs.find((item) => item.key == udfSelected.key)) {
      dispatch(udfSelectedAction(udfSelected))
    } else if (selectedUDFs.length == 0 && udfSelected == "") {
      udfSelected = UDFLookupListItems[0]
      dispatch(udfSelectedAction(udfSelected));
    } else if (selectedUDFs.length == 0) {
      dispatch(udfSelectedAction(udfSelected));
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View >
          <Text style={styles.textClr}>User Defined Field</Text>
          <ModelSelector listItems={UDFLookupListItems} onChange={changeUDF} />
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.btn} onPress={() => saveUDF()} >
              <Text style={styles.name}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => clearAllUDFs()} >
              <Text style={styles.name}>Cancel All</Text>
            </TouchableOpacity>
          </View>
          <View>
            {selectedUDFs &&
              selectedUDFs.map((field, index) => {
                return (
                  <View key={index} style={{
                    paddingVertical: 2,
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                    <Text style={styles.listElement} key={index} >
                      {field.label}
                    </Text>
                    <ModelSelector
                      style={styles.pickerStyle}
                      selectStyle={{ height: 40, width: 150 }}
                      listItems={selectedUDFs}
                      initValue={(field.label)}
                    />
                    <TouchableOpacity onPress={() => deleteUDF(field)}>
                      <Image style={styles.cancel_icon} source={crossIcon} />
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </View>
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
    width: 150,
    height: 50
  },
  btn: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    width: 180,
    marginRight: 10,
    textAlign: 'center',
  },
  name: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18
  },
  cancel_icon: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginTop: 4,
    marginLeft: 4
  },
  listElement: {
    padding: 10,
    flex: 1,
    //  width: 100,
    borderRadius: 20
  }
})