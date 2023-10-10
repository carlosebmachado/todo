import React, { useState } from 'react';
import { TouchableOpacity, Image, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from "react-native";

// icons
import iconCalender from '../assets/calendar.png';
import iconClock from '../assets/clock.png';

export default function Task(props) {
  const [value, setValue] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChange = (e, selectedValue) => {
    const currentValue = selectedValue || value;
    setShow(false);
    setValue(currentValue);
  };

  return (
    <TouchableOpacity onPress={() => setShow(true)}>
      <TextInput style={styles.input} editable={false} value={props.mode === 'date' ? value.toLocaleDateString() : value.toLocaleTimeString()} />
      <Image style={styles.iconTextInput} source={props.mode === 'date' ? iconCalender : iconClock} />
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
    borderBottomColor: '#F9AA33',
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
