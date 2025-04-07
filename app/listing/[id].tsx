import { useLayoutEffect } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Share } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import listingsData from "@/assets/data/listingsData.json";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

// compoennts
import Pricing from "@/components/Pricing";
import ListDetail from "@/components/ListDetail";
import ListIntro from "@/components/ListIntro";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";

const IMAGE_HEIGHT = 300;
const IMAGE_WIDTH = Dimensions.get("window").width;

const page = () => {
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const ScrollOffset = useScrollViewOffset(scrollRef);

  const shareListting = async () => {
    try {
      Share.share({
        title: name,
        url: listing_url,
      }); 
    } catch (error) {
      console.log("Error sharing listing: ", error);
      
    }
  }

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            ScrollOffset.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [-IMAGE_HEIGHT / 2, 0, IMAGE_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            ScrollOffset.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        ScrollOffset.value,
        [0, IMAGE_HEIGHT / 1.5],
        [0, 1]
      ),
    };
  }
  );

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerBackground: () => (
        <Animated.Image style={ [styles.header, headerAnimatedStyle] } />
      ), 

      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerBtn}
        >
          <Ionicons name="chevron-back" size={22} color="black" />
        </TouchableOpacity>
      ),

      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity onPress={shareListting} style={styles.headerBtn}>
            <Ionicons name="share-outline" size={22} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={shareListting} style={styles.headerBtn}>
            <Ionicons name="heart-outline" size={22} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  })

  const { id } = useLocalSearchParams<{ id: string }>();
  const listData = listingsData as ListingObject[];
  const {
    name,
    bedrooms,
    bathrooms,
    beds,
    room_type,
    guests_included,
    review_scores_rating,
    number_of_reviews,
    street,
    price,
    xl_picture_url,
    host_picture_url,
    host_name,
    host_since,
    host_location,
    description,
    last_scraped,
    neighborhood_overview,
    listing_url,
  } = listData.find((item) => item.id === id) as ListingObject;

  return (
    <View style={styles.wrapper}>
      <Animated.ScrollView scrollEventThrottle={16} ref={scrollRef}>
        <Animated.Image
          source={{ uri: xl_picture_url! }}
          style={[styles.image, imageAnimatedStyle]}
        />

        <View style={{ padding: 16, marginTop: 7, backgroundColor: "#fff" }}>
          <ListIntro
            name={name}
            room_type={room_type}
            street={street}
            bedrooms={bedrooms!}
            bathrooms={bathrooms!}
            beds={beds}
            guests_included={guests_included}
            review_scores_rating={review_scores_rating!}
            number_of_reviews={number_of_reviews}
          />

          <ListDetail
            host_picture_url={host_picture_url}
            host_name={host_name}
            host_location={host_location!}
            host_since={host_since}
            neighborhood_overview={neighborhood_overview!}
            description={description}
          />
        </View>
      </Animated.ScrollView>

      <Pricing scrapedDate={last_scraped} price={price} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 16,
    marginBottom: 16,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderColor: Colors.grey,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },

  bar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginRight: 5,
  },

  header: {
    backgroundColor: "#fff",
    borderColor: Colors.grey,
    borderWidth: StyleSheet.hairlineWidth,
    height: 100,
  }
});

export default page;
