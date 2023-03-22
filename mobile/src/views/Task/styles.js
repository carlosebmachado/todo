import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  imageIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 5
  },
  label: {
    color: '#707070',
    fontSize: 18,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 5
  },
  input: {
    fontSize: 18,
    padding: 10,
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: '#F9AA33',
    marginHorizontal: 10
  },
  inputarea: {
    fontSize: 18,
    padding: 10,
    width: '95%',
    borderWidth: 1,
    borderColor: '#F9AA33',
    borderRadius: 10,
    marginHorizontal: 10,
    height: 100,
    textAlignVertical: 'top'
  },
  inputInline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  inline: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 100
  },
  switchLabel: {
    fontWeight: 'bold',
    color: '#F9AA33',
    textTransform: 'uppercase',
    fontSize: 16,
    paddingLeft: 10
  },
  removeLabel: {
    fontWeight: 'bold',
    color: '#344955',
    textTransform: 'uppercase',
    fontSize: 16
  }
});

export default styles;
