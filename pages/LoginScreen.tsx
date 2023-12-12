import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import type {NativeSyntheticEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import type {TextInputChangeEventData} from 'react-native/Libraries/Components/TextInput/TextInput';
import {Button, Snackbar, Text, TextInput} from 'react-native-paper';
import * as Keychain from 'react-native-keychain';
import {keywordStorageKey} from '../stores/keywordStorageKey.ts';

export interface LoginScreenProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function LoginScreen(props: LoginScreenProps) {
  const [textInputModel, setTextInputModel] = useState('');
  const [visible, setVisible] = useState(false);
  const snackbarReason = useRef('');

  const openSnackBar = (reason: string) => {
    snackbarReason.current = reason;
    return setVisible(true);
  };

  const onPressLoginButton = async () => {
    if (!textInputModel) {
      return openSnackBar('Keyword must be not empty');
    }

    let result;
    try {
      result = await Keychain.setGenericPassword(
        keywordStorageKey,
        textInputModel,
      );
    } catch (_) {
      return openSnackBar('Not expected error while write to store');
    }

    if (!result) {
      return openSnackBar(
        'Something went wrong while add passkey to keychain store',
      );
    }

    props.setIsLoggedIn(true);
  };

  const onDismissSnackBar = () => setVisible(false);

  const onChangeTextInput = (
    evt: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const {text} = evt.nativeEvent;
    if (!text) {
      return;
    }

    setTextInputModel(() => evt.nativeEvent.text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.enterText} variant={'headlineMedium'}>
        Welcome to Passto
      </Text>
      <View>
        <TextInput
          label={'Keyword'}
          onChange={onChangeTextInput}
          style={styles.input}
        />
        <Button
          style={styles.button}
          onPress={onPressLoginButton}
          mode={'contained-tonal'}>
          Enter
        </Button>
        <Button style={styles.helpButton}>What is Passto?</Button>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{label: 'Ok'}}
        duration={3000}>
        {snackbarReason.current}
      </Snackbar>
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
