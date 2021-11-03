import React, { useEffect } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import { State } from '@twilio/conversations'
import { RootStackParamList } from '../type/RootStackParamList'
import { Client } from '@twilio/conversations'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({ route }: Props) => {
  const token = route.params.token

  useEffect(() => {
    const client = new Client(token)

    // Before you use the client, subscribe to the `'stateChanged'` event and wait
    // for the `'initialized'` state to be reported.
    client.on('stateChanged', (state: State) => {
      if (state === 'initialized') {
        // Use the client
      }
    })
  }, [])

  return (
    <View>
      <Text>Hello : {token} </Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
