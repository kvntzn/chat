import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Client, State } from '@twilio/conversations'
import axios, { AxiosResponse } from 'axios'

export default function App() {
  const [textInput, setTextInput] = useState('')

  const onLogin = async () => {
    const response: AxiosResponse<IToken> = await axios.get(
      `http://localhost:3000/token/${textInput}`
    )
    const { token } = response.data
    console.log('token', token)

    const client = new Client(token)
    client.on('stateChanged', (state: State) => {
      if (state === 'initialized') {
        // Use the client
        console.log(state)
      }
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <TextInput
        value={textInput}
        onChangeText={setTextInput}
        style={{
          borderWidth: 0.2,
          height: 40,
        }}
      />
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <View>
          <Text style={{ color: '#fff' }}>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 16,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    padding: 8,
  },
})
