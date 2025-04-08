import { View, Text, StyleSheet, ListRenderItem, TouchableOpacity, Image, FlatList } from 'react-native'
import { useMemo, } from 'react'
import { useCategoryStore } from '@/store/store'
import { Link } from 'expo-router';
import listingsData from '@/assets/data/listingsData.json';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { Fonts } from '@/constants';

const Listings = () => {
  const category = useCategoryStore(state => state.selectedCategory);

  const listItems = useMemo<ListingObject[]>(() => listingsData as ListingObject[], []);
  const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20'

  const RenderItems: ListRenderItem<ListingObject> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild> 
      <TouchableOpacity style={{ marginBottom: 30 }} activeOpacity={0.8}>
        <Animated.View entering={FadeInRight} exiting={FadeInLeft}>
          <Image 
            source={{ uri: item.xl_picture_url! }} 
            defaultSource={{ uri: DEFAULT_IMAGE }}
            style={styles.image} 
          />
          <TouchableOpacity style={styles.like}>
            <Ionicons name='heart-outline' size={24} color={'#000'}/>
          </TouchableOpacity>

          <View style={{marginTop: 10, marginBottom: 20,}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <View style={{flex: 1,}}>
                <Text 
                  style={{fontFamily: Fonts.ubuntuMedium, fontSize: 16,}}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  {item.name}
                </Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center', gap: 4, }}>
                <Ionicons name='star' size={16} />
                <Text>
                  { (item.review_scores_rating! / 20).toFixed(1) }
                </Text>
              </View>
            </View>

            <Text>{item.bed_type}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  )

  return (
    <View>
      <FlatList 
        data={listItems}
        renderItem={RenderItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },

  like: {
    position: 'absolute',
    right: 20,
    top: 15
  }
});

export default Listings