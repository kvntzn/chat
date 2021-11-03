import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CreateConversationOptions } from '@twilio/conversations'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useConversationContext } from '../provider/ConversationsProvider'
import { RootStackParamList } from '../type/RootStackParamList'

type Props = NativeStackScreenProps<RootStackParamList, 'NewConversation'>

const NewConversation = ({ navigation }: Props) => {
  const { twilioClient } = useConversationContext()
  const [name, setName] = useState('')

  const onCreate = async () => {
    const options: CreateConversationOptions = {
      friendlyName: name,
      uniqueName: name,
    }

    try {
      const conversation = await twilioClient.getConversationByUniqueName(
        options.uniqueName!!
      )

      if (conversation) {
        await conversation.join()
        return
      }
    } catch (error: any) {
      console.error('error', error.body.code)
      await twilioClient.createConversation(options)
    } finally {
      navigation.pop()
    }
  }

  //   React.useEffect(() => {
  //     const init = async () => {
  //       const users = await twilioClient.getSubscribedUsers()
  //       console.log(users)
  //     }

  //     init()
  //   }, [])

  return (
    <View style={styles.container}>
      <Text>Conversation Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 0.2,
          height: 40,
        }}
      />

      <TouchableOpacity style={styles.button} onPress={onCreate}>
        <Text style={{ color: '#fff' }}>Create</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NewConversation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    padding: 8,
  },
})
