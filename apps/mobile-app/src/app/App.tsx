/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

export const App = () => {
  const url = __DEV__ ? 'http://localhost:4200' : '';
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
