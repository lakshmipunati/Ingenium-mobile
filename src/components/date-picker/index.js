import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { CalenderIcon } from '../../assets';
import moment from 'moment';

export function SharedDateTimePicker(props) {
  const [date, setDate] = useState();
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    props.handleChangeDate(props.name, currentDate);
  };

  useEffect(() => {
    setDate(props.value && props.value !== '' ? props.value : undefined);
  }, [props, date]);

  const showDatepicker = () => {
    setShow(true);
  };

  const getDate = (newDate) =>
    newDate ? moment(newDate).format('DD-MM-YYYY') : null;

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <TouchableOpacity onPress={showDatepicker} style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{date ? getDate(date) : null}</Text>
        </View>
        <View style={styles.icon}>
          <CalenderIcon width='25px' height='35px' fill='#059DCC' />
        </View>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date ? new Date(moment(date)) : new Date()}
          mode='date'
          display='default'
          onChange={onChange}
          dateFormat='DD-MM-YYYY'
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#A9A9A9',
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 10,
  },
  dateText: {
    fontSize: 16,
    textAlign: 'center',
  },
  dateContainer: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    borderColor: '#ccc',
    flex: 1,
  },
  container: {
    flexDirection: 'row',
  },
  icon: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 35,
    height: 40,
    marginTop: 0,
    borderRadius: 10,
    paddingLeft: 4,
    marginLeft: 5,
    // marginLeft: -5
    // marginLeft: 5
  },
});
