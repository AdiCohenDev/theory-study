/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import SplashScreen from 'react-native-splash-screen';

export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const url = __DEV__ ? 'http://localhost:4200' : 'https://theory-study.vercel.app/login';
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <WebView source={{ uri: url }} />
      </SafeAreaView>
    </>
  );
};

export default App;
