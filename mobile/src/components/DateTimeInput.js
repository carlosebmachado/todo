import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import constants from '../constants';

export default function DateTimeInput(props) {
  const [value, setValue] = useState(props.value || new Date());
  const [show, setShow] = useState(false);

  const onChange = (e, selectedValue) => {
    const currentValue = selectedValue || value;
    setShow(false);
    setValue(currentValue);
    props.onValueChange(currentValue);
  };

  return (
    <TouchableOpacity onPress={() => setShow(true)}>
      <TextInput {...props} style={styles.input} editable={false} value={props.mode === 'date' ? value.toLocaleDateString() : value.toLocaleTimeString()} />
      {props.mode === 'date' ?
        <FontAwesome5 style={styles.iconTextInput} name="calendar-alt" size={21} color={constants.colors.primary} />
        :
        <FontAwesome5 style={styles.iconTextInput} name="clock" size={21} color={constants.colors.primary} />
      }
      {
        show &&
        <DateTimePicker
          value={value}
          mode={props.mode}
          is24Hour={false}
          display="default"
          onChange={onChange} />
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    padding: 10,
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: constants.colors.primary,
    marginHorizontal: 10
  },
  iconTextInput: {
    position: 'absolute',
    left: '90%',
    top: 15,
    width: 22,
    height: 22,
    resizeMode: 'contain'
  }
});
