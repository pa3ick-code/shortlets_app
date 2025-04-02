import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth, useClerk, useUser } from '@clerk/clerk-expo'

const profile = () => {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const { user } = useUser();
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log('Error signing out:', error);
    }
  }
  return (
    <View >
      <Text>Profile</Text>
      <Text>{ user?.username }</Text>
      <Text>{ isSignedIn ? 'Signed In' : 'Not Signed In' }</Text>
      <Text>{ user?.emailAddresses[0].emailAddress }</Text>
      <TouchableOpacity onPress={handleSignOut} >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default profile