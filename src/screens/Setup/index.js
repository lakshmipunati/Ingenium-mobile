import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ModelSelector } from '../../components';
import { crossIcon } from '../../assets/images';

export const Setup = (props) => {
  let index = 0;
  const data = [
    { key: index++, section: true, label: 'Fruits' },
    { key: index++, label: 'Red Apples' },
    { key: index++, label: 'Cherries' },
    { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
    { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
  ];
  let listitems = data;

  const deleteUDF = (index) => {
    listitems = listitems.splice(0, index);
  }

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.textClr}>User Defined Field</Text>
          <ModelSelector listItems={data} />
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.name}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.name}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View>
            {listitems &&
              listitems.map((field, index) => {
                return (
                  <View style={{
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
                      listItems={listitems}
                      initValue={(field.label)}
                    />
                    <TouchableOpacity onPress={() => deleteUDF(index)}>
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