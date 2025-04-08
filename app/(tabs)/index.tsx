import { View, Text, ActivityIndicator } from 'react-native'
import React, { useMemo } from 'react'
import { Link, Stack } from 'expo-router'
import { useUser } from '@clerk/clerk-expo';
import { Colors } from '@/constants';
import listingGeojson from "@/assets/data/listingGeo.json";

// components
import ListingsMap from '@/components/ListingsMap';
import Listings from "@/components/Listings";
import ExploreHeader from "@/components/ExploreHeader";

const page = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded){ 
    return( 
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
      <ActivityIndicator size={35} color={Colors.primary} /> 
    </View>);
  }

  return (
    <View style={{flex: 1,}}>
      {/* <Stack.Screen  
        options={{
          header: () => <ExploreHeader  />,
        }}
      /> */}
      

      <View style={{flex: 1, padding: 16}}>
        {/* <Listings /> */}
        <ListingsMap listings={listingGeojson} />
      </View>
    </View>
  )
}

export default page