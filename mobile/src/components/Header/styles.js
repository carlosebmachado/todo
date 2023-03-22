import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 70,
    backgroundColor: '#344955',
    borderBottomWidth: 3,
    borderBottomColor: '#F9AA33',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 30
  },
  notification: {
    position: 'absolute',
    right: 20
  },
  notificationImage: {
    width: 25,
    height: 30
  },
  notificationTextBackground: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 13,
    bottom: 13
  },
  notificationText: {
    color: '#F9AA33',
    fontWeight: 'bold'
  },
  leftIcon: {
    position: 'absolute',
    left: 20
  },
  leftIconImage: {
    width: 30,
    height: 30
  }
});

export default styles;
