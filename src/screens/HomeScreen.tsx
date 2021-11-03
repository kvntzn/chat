import React, { useEffect } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { RootStackParamList } from '../type/RootStackParamList'
import { useConversationContext } from '../provider/ConversationsProvider'
import { Conversation } from '@twilio/conversations'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({ route }: Props) => {
  const token = route.params.token

  const { conversations, initializeClient } =
    useConversationContext()

  useEffect(() => {
    initializeClient(token)
  }, [])

  const renderItem = ({ item }: { item: Conversation }) => {
    return <Text>{item.friendlyName}</Text>
  }

  return (
    <View>
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.sid}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
