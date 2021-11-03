import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ConversationProvider } from './src/provider/ConversationsProvider'
import LoginScreen from './src/screens/LoginScreen'
import HomeScreen from './src/screens/HomeScreen'
import NewConversation from './src/screens/NewConversation'

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <ConversationProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Welcome' component={LoginScreen} />

          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('NewConversation')
                  }}
                >
                  <Text>Add</Text>
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen
            name='NewConversation'
            component={NewConversation}
            options={{
              title: 'New Conversation',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ConversationProvider>
  )
}
