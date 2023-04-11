import React, { FC, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckIcon, CloseIcon } from '../../atoms/icon';
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
});

interface Props {
  form?: any;
  onChangeValue?: any;
}

const PasswordForm : FC<Props> = ({ form = {}, onChangeValue = () => {} }) => {
  const validateIcon = (valid:boolean) => {
    if (valid) {
      return (
        <CheckIcon
          color={text.success}
          size={18}
        />
      )
    }
    return (
      <CloseIcon
        color={text.error}
        size={18}
      />
    )
  }
  const validateColor = (valid:boolean) => {
    return valid ? text.success : text.error;
  }
  const renderPasswordChecker = (checked:boolean) => {
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
  const passwordMeterColor = (strength:string) => {
    if (strength === 'Average') {
      return '#F8BF24';
    } else if (strength === 'Strong') {
      return '#2C9669';
    }
    return '#DC2626';
  }
  return (
    <View style={styles.container}>
      <InputField
        inputStyle={InputStyles.text}
        label={'New password'}
        placeholder="New password"
        textContentType="oneTimeCode"
        required={true}
        hasValidation={false}
        outlineStyle={InputStyles.outlineStyle}
        activeColor={text.primary}
        errorColor={text.error}
        requiredColor={text.error}
        secureTextEntry={!form?.showPassword?.value}
        error={form?.password?.error}
        value={form?.password?.value}
        onChangeText={(value: string) => onChangeValue('password', value)}
        onSubmitEditing={(event:any) => onChangeValue('password', event.nativeEvent.text)}
      />
      <View style={{ marginBottom: 20, marginTop: 5 }}>
        <Text
          style={InputStyles.text}
          size={12}
          color={text.default}
        >
          Your password must have:
        </Text>
        <View style={styles.passwordValidationContainer}>
          <View style={styles.horizontal}>
            {validateIcon(form?.password?.characterLength)}
            <Text
              style={styles.label}
              size={12}
              color={validateColor(form?.password?.characterLength)}
            >
              8 or more characters
            </Text>
          </View>
          <View style={styles.horizontal}>
            {validateIcon(form?.password?.upperAndLowerCase)}
            <Text
              style={styles.label}
              size={12}
              color={validateColor(form?.password?.upperAndLowerCase)}
            >
              Uppercase and lowercase letters
            </Text>
          </View>
          <View style={styles.horizontal}>
            {validateIcon(form?.password?.atLeastOneNumber)}
            <Text
              style={styles.label}
              size={12}
              color={validateColor(form?.password?.atLeastOneNumber)}
            >
              At least one number
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={[InputStyles.text, { fontWeight: '600' }]}
            size={12}
            color={text.default}
          >
            Strength:
          </Text>
          <Text
            style={[InputStyles.text,
              {
                fontWeight: '600',
                color: passwordMeterColor(form?.password?.strength),
              }
            ]}
            size={12}
          >
            {` ${form?.password?.strength || 'Weak'}`}
          </Text>
        </View>
        <View style={styles.horizontal}>
          <View
            style={[
              styles.strengthBar,
              {
                backgroundColor: passwordMeterColor(form?.password?.strength)
              }]
            }
          />
        </View>
      </View>
      <InputField
        inputStyle={InputStyles.text}
        label={'Confirm'}
        placeholder="Confirm new password"
        textContentType="oneTimeCode"
        required={true}
        hasValidation={true}
        outlineStyle={InputStyles.outlineStyle}
        activeColor={text.primary}
        errorColor={text.error}
        requiredColor={text.error}
        secureTextEntry={!form?.showPassword?.value}
        error={form?.confirmPassword?.error}
        value={form?.confirmPassword?.value}
        onChangeText={(value: string) => onChangeValue('confirmPassword', value)}
        onSubmitEditing={(event:any) => onChangeValue('confirmPassword', event.nativeEvent.text)}
      />
      <View style={[styles.horizontal, { marginTop: 20 }]}>
        <TouchableOpacity onPress={() => onChangeValue('showPassword', !form?.showPassword?.value)}>
          {renderPasswordChecker(form?.showPassword?.value)}
        </TouchableOpacity>
        <Text
          style={[InputStyles.text, styles.label]}
          size={14}
        >
          Show password
        </Text>
      </View>
    </View>
  );
};

export default PasswordForm;
