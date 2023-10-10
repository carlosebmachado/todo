import React from 'react';
import { StyleSheet } from "react-native";
import { View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


export default function TypeIcon({ type, color, backgroundColor, size }) {
  const iconSize = size * 0.6;

  return (
    <View style={[styles.wrapper, { backgroundColor, width: size, height: size, borderRadius: size }]}>
      {(() => {
        switch (type) {
          case 1: return <FontAwesome5 name="sticky-note" size={iconSize} color={color} />;
          case 2: return <FontAwesome5 name="utensils" size={iconSize} color={color} />;
          case 3: return <FontAwesome5 name="briefcase" size={iconSize} color={color} />;
          case 4: return <FontAwesome5 name="users" size={iconSize} color={color} />;
          case 5: return <FontAwesome5 name="book" size={iconSize} color={color} />;
          case 6: return <FontAwesome5 name="shopping-cart" size={iconSize} color={color} />;
          case 7: return <FontAwesome5 name="plane" size={iconSize} color={color} />;
          case 8: return <FontAwesome5 name="dumbbell" size={iconSize} color={color} />;
          default: return <></>;
        }
      })()}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
