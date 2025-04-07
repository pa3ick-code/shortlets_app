import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Colors, Fonts } from '@/constants';
import CategoryScrollView from './CategoryScrollView';

const ExploreHeader = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", paddingVertical: 10, }}>
        <View>
            <View style={styles.wrapper}>
                <Link href="/(modals)/bookings" asChild >
                    <TouchableOpacity style={styles.searchWrapper}> 
                        <Ionicons name="search-outline" size={24} color="black" />

                        <View>
                            <Text style={{ fontFamily: Fonts.ubuntuBold, marginBottom:2, }}>
                                Where to?
                            </Text>
                            <Text style={{ fontFamily: Fonts.ubuntuRegular, color: Colors.grey, }}>
                                Anywhere ・ Any week.
                            </Text>
                        </View>
                    </TouchableOpacity>
                </Link>

                <TouchableOpacity style={styles.filter}>
                    <Ionicons name="filter" size={24} color="black" />
                </TouchableOpacity>
            </View>     
        </View>

        <CategoryScrollView />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    wrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    filter: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        borderWidth: StyleSheet.hairlineWidth
    },

    searchWrapper: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 10, 
        paddingVertical: 10,
        backgroundColor: "#fff",
        flex: 1,
        borderRadius: 50,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 3.84,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#c2c2c2",
        height: 50,
        marginRight: 10,
        elevation: 3,
    }
});

export default ExploreHeader