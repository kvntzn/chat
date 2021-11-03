import React from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './src/screens/LoginScreen'
import HomeScreen from './src/screens/HomeScreen'

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Welcome' component={LoginScreen} />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerRight: () => <Text>Add</Text>,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
