import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    width: '95%',
    height: 70,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  cardLeftSide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardIcon: {
    width: 40,
    height: 40
  },
  cardTitle: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16
  },
  cardRightSide: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  cardDate: {
    color: '#F9AA33',
    fontWeight: 'bold',
    fontSize: 16
  },
  cardTime: {
    color: '#707070'
  },
  cardDone: {
    opacity: 0.5
  }
});

export default styles;
