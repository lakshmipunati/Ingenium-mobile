import React from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import moment from 'moment';

export function LabelValue(props) {
  const getValue = (value) => {
    //if (moment(value).isValid()) {
    if (props.fieldType == 'DATE' && props.value) {
      return moment(props.value).format('MM-DD-YYYY');
    } else if (props.fieldType == 'CURRENCY' && value) {
      return '$ '+ parseFloat(value).toFixed(2);
    } else {
      return value;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label} : </Text>
      <Text numberOfLines={1} ellipsizeMode='tail' style={styles.value}>
        {getValue(props.value)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#A9A9A9'
  },
  value: {
    flex: 1,
    fontSize: 18,
    color: '#A9A9A9',
    textTransform: 'uppercase'
  }
})