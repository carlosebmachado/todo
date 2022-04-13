import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 70,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#344955',
    borderTopWidth: 3,
    borderTopColor: '#F9AA33',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    position: 'relative',
    top: -25
  },
  buttonImage: {
    width: 80,
    height: 80
  },
  text: {
    position: 'relative',
    top: -22,
    color: 'white'
  }
});

export default styles;
