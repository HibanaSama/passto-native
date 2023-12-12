import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import crypto from 'crypto-js';
import Keychain from 'react-native-keychain';
import {Button, TextInput} from 'react-native-paper';
import type {NativeSyntheticEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import type {TextInputChangeEventData} from 'react-native/Libraries/Components/TextInput/TextInput';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function PasswordScreen() {
  const hashedPassword = useRef('');

  useEffect(() => {
    Keychain.getGenericPassword().then(v => {
      const credentials = v as Keychain.UserCredentials;
      hashedPassword.current = crypto.SHA256(credentials.password).toString();
    });
  }, []);

  const onChangeTextInput = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const {text} = evt.nativeEvent;
    if (!text) {
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          onChange={onChangeTextInput}
          style={styles.input}
          label={'Service name'}
        />
      </View>
      <Button>Make my password</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enterText: {
    marginBottom: height * 0.03,
  },
  input: {
    height: height * 0.07,
    width: width * 0.8,
    marginBottom: height * 0.015,
  },
  button: {
    height: height * 0.05,
  },
  helpButton: {
    marginTop: height * 0.016,
  },
});
