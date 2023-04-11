import React, { FC, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { CheckIcon } from '../../atoms/icon';
import {
  InputField,
} from '../../molecules/form-fields';
import InputStyles from '../../../../src/styles/input-style';
import { text } from '../../../../src/styles/color';
import Text from '../../atoms/text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    marginLeft: 10
  },
  passwordValidationContainer: {
    paddingVertical: 5,
    marginBottom: 10,
    marginTop: 5,
  },
  strengthBar: {
    height: 4,
    borderRadius: 4,
    marginTop: 10,
    flex: 1,
  },
  horizontal: {
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  unchecked: {
    height: 18,
    width: 18,
    backgroundColor: '#DBDFE5',
    borderRadius: 3,
  }
})

interface Props {
  formValue?: any;
  onChangeText?: any;
}

const RegistrationForm: FC<Props> = ({ formValue = {}, onChangeText = () => {} }) => {
  const handlePress = useCallback(() => {
    Linking.openURL('https://ntc.gov.ph/');
  }, []);

  const renderAgreedChecker = (checked:boolean) => {
    if (checked) {
      return (
        <View
          style={[
            styles.unchecked,
            {
              backgroundColor: text.primary,
              justifyContent: 'center',
              alignItems: 'center'
            }
          ]}
        >
          <CheckIcon
            type="check"
            color="white"
            size={14}
          />
        </View>
      );
    }
    return (
      <View style={styles.unchecked} />
    );
  }

  return (
    <View style={styles.container}>
      <InputField
        inputStyle={InputStyles.text}
        label={'First name'}
        placeholder="First name"
        required={true}
        hasValidation={true}
        outlineStyle={InputStyles.outlineStyle}
        activeColor={text.primary}
        errorColor={text.error}
        error={formValue?.firstname?.error}
        requiredColor={text.error}
        value={formValue?.firstname?.value}
        onChangeText={(value: string) => onChangeText('firstname', value)}
      />
      <InputField
        inputStyle={InputStyles.text}
        label={'Middle name'}
        placeholder="Middle name"
        required={true}
        hasValidation={true}
        outlineStyle={InputStyles.outlineStyle}
        activeColor={text.primary}
        errorColor={text.error}
        requiredColor={text.error}
        error={formValue?.middlename?.error}
        value={formValue?.middlename?.value}
        onChangeText={(value: string) => onChangeText('middlename', value)}
      />
      <InputField
        inputStyle={InputStyles.text}
        label={'Last name'}
        placeholder="Last name"
        required={true}
        hasValidation={true}
        outlineStyle={InputStyles.outlineStyle}
        activeColor={text.primary}
        errorColor={text.error}
        requiredColor={text.error}
        error={formValue?.lastname?.error}
        value={formValue?.lastname?.value}
        onChangeText={(value: string) => onChangeText('lastname', value)}
      />
      <InputField
        inputStyle={[InputStyles.text, { marginVertical: 10 }]}
        label={'Address'}
        placeholder="Address"
        required={true}
        hasValidation={true}
        multiline={true}
        outlineStyle={[InputStyles.outlineStyle, { height: 110 }]}
        activeColor={text.primary}
        errorColor={text.error}
        requiredColor={text.error}
        error={formValue?.address?.error}
        value={formValue?.address?.value}
        onChangeText={(value: string) => onChangeText('address', value)}
      />
      <View style={styles.horizontal}>
        <TouchableOpacity onPress={() => onChangeText('agreed', !formValue?.agreed?.value)}>
          {renderAgreedChecker(formValue?.agreed?.value)}
        </TouchableOpacity>
        <Text
          style={[InputStyles.text, styles.label]}
          size={12}
        >
          {'By clicking Sign up, you agree to our'}
          <Text
            onPress={handlePress}
            style={[
              InputStyles.text,
              {
                color: text.primary
              }
            ]}
            size={12}
          >
            {' Terms, Data Policy '}
          </Text>
          {'and'}
          <Text
            onPress={handlePress}
            style={[
              InputStyles.text,
              {
                color: text.primary
              }
            ]}
            size={12}
          >
            {' Cookies Policy.'}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default RegistrationForm;
