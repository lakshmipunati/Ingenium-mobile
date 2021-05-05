import React from 'react';
import { Text, View, StyleSheet , TouchableOpacity } from 'react-native';
import { SharedTextInput } from '../../components';

export const Setup = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textClr}>User Defined Field</Text>
      <SharedTextInput />
      <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.name}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.name}>Cancel</Text>
                </TouchableOpacity>
            </View>
            {/* <View>
              
            </View> */}
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
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 150
},
btn: {
  padding: 15,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#ccc",
  width: 180,
  marginRight: 10
},
name: {
  textAlign: 'center',
  color: 'black',
  fontSize: 18
}
})