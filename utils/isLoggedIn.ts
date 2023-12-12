import {keywordStorageKey} from '../stores/keywordStorageKey.ts';
import Keychain from 'react-native-keychain';

export const isLoggedIn = async () => {
  const genericPassword = await Keychain.getGenericPassword();
  return !!(
    genericPassword &&
    genericPassword.username === keywordStorageKey &&
    genericPassword.password
  );
};
