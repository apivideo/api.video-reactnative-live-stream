import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  title: {
    color: '#42474f',
    marginBottom: 5,
    marginLeft: 15,
  },
  subSectionsContainer: {
    marginBottom: 30,
  },
  subSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#24272b',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 1,
    minHeight: 45,
  },
  subTitle: {
    color: '#FFFFFF',
    marginLeft: 10,
    marginRight: 20,
  },
  settingValueContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingValue: {
    marginRight: 10,
    color: '#42474f',
  },
  dropdown: {
    backgroundColor: '#42474f',
  },
  dropdownItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dropdownItemTitle: {
    color: '#FFFFFF',
    marginLeft: 10,
  },
  sliderItemLabel: {
    marginLeft: 20,
    color: '#FFFFFF',
  },
  inputItemField: {
    color: '#FFFFFF',
  },
});
