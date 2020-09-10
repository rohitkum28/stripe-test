/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Button,
  Text,
  View
} from 'react-native';
import stripe from 'tipsi-stripe'

const App = () => {

  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null)


  stripe.setOptions({
    publishableKey: '<PUBLISHABLE_KEY>',
    //merchantId: '<MERCHANT_ID>',
    //androidPayMode: 'test',
  })
  const handleCardPayPress = async () => {
    console.log('handleCardPayPress()')
    // const options = {}
    try {
      setLoading(true)
      const token = await stripe.paymentRequestWithCardForm()
      console.log('Token from Card ', token)
      setToken(token)
      setLoading(false)

    } catch (error) {
      console.log('handleCardPayPress Error ', error)
      setLoading(false)
    }


  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>
          Card Form Example
        </Text>
        <Text style={styles.instruction}>
          Click button to show Card Form dialog.
        </Text>
        <Button
          title="Enter you card and pay"
          onPress={handleCardPayPress}
        />
        <View style={styles.token}>
          {token &&
            <Text style={styles.instruction}>
              Token: {token.id}
            </Text>
          }
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
});

export default App;
