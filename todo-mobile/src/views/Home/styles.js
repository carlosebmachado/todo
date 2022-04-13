import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  title: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#344955',
    alignItems: 'center'
  },
  titleText: {
    color: '#344955',
    fontSize: 18,
    position: 'relative',
    top: 11,
    backgroundColor: 'white',
    paddingHorizontal: 10
  },
  filter: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems:  'center',
    justifyContent: 'space-around'
  },
  filterTextActived: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#F9AA33'
  },
  filterTextInactived: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#344955',
    opacity: 0.5
  },
  cards: {
    width: '100%',
    marginTop: 30
  }
});

export default styles;
