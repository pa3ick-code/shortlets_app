import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const page = () => {
  return (
    <View>
      <Text>page</Text>
      <Link href="/(modals)/login">Login</Link>
    </View>
  )
}

export default page