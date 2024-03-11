import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'center',
    color: '#333',
    padding: 15,
  },

  blackText: {
    color: '#333',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  sectionStarter: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 6,
  },
  input: {
    width: 200,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
    color: '#333',
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonTable: {
    width: 'auto',
    height: 40,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
    marginTop: 3,
    marginLeft: 3,
  },
  buttonTableColor: {
    width: 'auto',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
    marginTop: 3,
    marginLeft: 3,
    backgroundColor: '#333',
  },
  buttonTableColorRed: {
    width: 'auto',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
    marginTop: 3,
    marginLeft: 3,
    backgroundColor: '#B71C1C',
  },
  buttonTableColorBlue: {
    width: 'auto',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
    marginTop: 3,
    marginLeft: 3,
    backgroundColor: '#2196F3',
  },
  buttonAcknowldge: {
    width: 90,
    height: 32,
    backgroundColor: '#cd2122',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonTextTable: {
    color: '#fff',
    padding: 5,
    // fontWeight: 'bold',
  },

  //Landscape mode
  landingContainer: {
    flexDirection: 'row',
  },
  landingTitle: {
    fontSize: 24,
  },
  screenTitle: {
    fontSize: 24,
    color: '#fff',
  },
  screenText: {
    color: '#333',
  },
  sized: {
    backgroundColor: '#001b5a',
    // height: 10,
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // table: {
  //   borderWidth: 1
  // },
  // tableRow: {
  //   flexDirection: 'row'
  // },
  // tableCell: {
  //   borderWidth: 1
  // },
  // tableHeader: {
  //   fontWeight: 'bold'
  // }

  // Job Screen
  jobsWrapper: {
    position: 'relative',
  },
  jobStatus: {
    position: 'absolute',
    // left: 0,
    // top: 50,
    //
    width: '100%',
    // height: 20,
    zIndex: 999,
    backgroundColor: '#333',
  },
  jobStatusText: {
    color: '#fff',
    textAlign: 'center',
  },

  // check list
  checkListcontainer: {
    flex: 1,
    // backgroundColor: '#cd2122',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    textAlign: 'center',
    color: '#333',
    padding: 15,
  },
  // checkListWrapper: {
  //   flex: 1,
  //   alignItems: 'stretch',
  //   justifyContent: 'space-between',
  //   textAlign: 'center',
  //   width: '100%',
  //   backgroundColor: '#dddddd'
  // },
  checkboxWrap: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    color: '#333',
  },
  checkboxItem: {},
  checkboxText: {
    color: '#333',
    marginLeft: 10,
    width: '85%',
  },

  checklistHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 15,
    marginBottom: 10,
  },
  checklistHeadingText: {
    color: '#000',
    fontSize: 24,
  },
  errorWrapper: {
    borderWidth: 1,
    borderColor: '#fe0101',
    width: '100%',
    padding: 6,
  },
  errorMessage: {
    color: '#fe0101',
  },
});

export default styles;
