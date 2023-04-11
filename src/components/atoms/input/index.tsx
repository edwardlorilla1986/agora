import React, { FC } from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';
import { defaultColor } from '../../../../src/styles/color';

const styles = StyleSheet.create({
  input: {
    padding: 10,
    width: '100%',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    ...Platform.select({
      web: {
        outlineStyle: 'none'
      }
    }),
    paddingVertical: Platform.OS === 'android' ? 5 : 10,
  }
});

interface Props {
  value?: string;
  secureTextEntry?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  style?: any;
  [x: string]: any;
}

const Input: FC<Props> = ({
  value = '',
  style,
  placeholderTextColor = defaultColor,
  secureTextEntry = false,
  placeholder = '',
  ...otherProps
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      autoCompleteType="off"
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      underlineColorAndroid={'transparent'}
      {...otherProps}
    />
  );
};

export default Input;
