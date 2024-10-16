import { useDispatch } from 'react-redux';
import { Button } from '../components/Button/Button';
import { fetchAuthToken } from './auth.slice';
import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export function AuthContainer({ marketConfig, marketLogo }) {
  const dispatch = useDispatch();
  const [mobileNo, setMobileNo] = useState('');
  const mobileNoLength = 10;

  const onLogin = () => {
    if (mobileNo === '') {
      return Alert.alert('', 'Please enter phone number');
    } else if (mobileNo.length !== mobileNoLength) {
      return Alert.alert('', 'Please enter 10 digits valid phone number');
    } else {
      console.log('mobileNo login event');
      dispatch(fetchAuthToken() as any);
    }
  };
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Image source={marketLogo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.signInText}>Sign in with your phone number</Text>
      <TextInput
        maxLength={mobileNoLength}
        style={styles.inputText}
        placeholder="Enter Your Phone Number"
        keyboardType="numeric"
        value={mobileNo}
        onChangeText={setMobileNo}
      />
      <Button onPress={onLogin}>Continue</Button>
    </View>
  );
}

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 15,
  },
  logo: {
    height: cssTheme.loginLogo.height,
    width: cssTheme.loginLogo.width,
  },
  signInText: {
    textAlign: 'center',
    fontSize: 18,
  },
  inputText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: cssTheme.colors.primary[900],
  },
});
}
