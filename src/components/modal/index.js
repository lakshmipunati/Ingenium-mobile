import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CloseIcon } from '../../assets';

export function ExpoModal(props) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TouchableOpacity
              style={styles.openButton}
              onPress={() => props.hideModalBox()}>
             <CloseIcon height="20px" width="20px" fill="#059DCC"/>
            </TouchableOpacity>
            <View style={styles.modalText}>
                <Text style={styles.textStyle}>{props.message}</Text>
            </View>                   
          </View>
        </View>
      </Modal>    
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    width: '90%',
    height: 200,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton:{
      alignItems: 'flex-end',
  },
 
  textStyle: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16
  },
  modalText: {
    marginTop: 45,
    textAlign: 'center',
    alignItems: 'center',
  },
});