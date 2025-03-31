import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'

// icons
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const _layout = () => {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
            fontFamily: "UbuntuMedium",
        }
    }}>

        <Tabs.Screen 
            name='index'
            options={{
                tabBarLabel: "Explore",
                tabBarIcon: ({ color, size }) => ( <AntDesign name='search1' color={color} size={size}/>)
            }}
        />
        <Tabs.Screen 
            name='wishlist'
            options={{
                tabBarLabel: "WishList",
                tabBarIcon: ({ color, size }) => ( <AntDesign name='hearto' color={color} size={size}/>)
            }}
        />
        <Tabs.Screen 
            name='trips'
            options={{
                tabBarLabel: "Trips",
                tabBarIcon: ({ color, size }) => ( <MaterialIcons name='mode-of-travel' color={color} size={size}/>)
            }}
        />
        <Tabs.Screen 
            name='inbox'
            options={{
                tabBarLabel: "Inbox",
                tabBarIcon: ({ color, size }) => ( <AntDesign name='message1' color={color} size={size}/>)
            }}
        />
        <Tabs.Screen 
            name='profile'
            options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ color, size }) => ( <Ionicons name='person-circle-outline' color={color} size={size} />)
            }}
        />
        
    </Tabs>
  )
}

export default _layout