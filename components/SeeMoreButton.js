import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const SeeMoreButton = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonStyle: {
    height: 20,
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 5,
    backgroundColor: 'green',
  },
};

export default SeeMoreButton;
