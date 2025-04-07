import { View, Text, ActivityIndicator } from 'react-native'
import React, { useMemo } from 'react'
import { Link, Stack } from 'expo-router'
import { useUser } from '@clerk/clerk-expo';
import { Colors } from '@/constants';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';

const page = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded){ 
    return( 
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
      <ActivityIndicator size={25} color={Colors.primary} /> 
    </View>);
  }

  return (
    <View style={{flex: 1,}}>
      <Stack.Screen  
        options={{
          header: () => <ExploreHeader  />,
        }}
      />
      

      <View style={{flex: 1, padding: 16}}>
        <Listings />
      </View>
    </View>
  )
}

export default page