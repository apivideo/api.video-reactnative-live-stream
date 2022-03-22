import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: '#18191A',
  },
  settingsHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  closeButton: {
    marginRight: 15,
  },
  settingsTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 15,
  },
});
