import { Fonts } from '@/constants';
import { useRouter } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native'
import MapView from 'react-native-map-clustering'
import { Marker } from 'react-native-maps';

interface Props {
  listings: any
}

const ListingsMap = ({ listings }: Props) => {
  const INITIAL_REGION = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 9,
    longitudeDelta: 9,
  };
  const router = useRouter();
  const onMarkerPress = (listings: GeoListing) => {
    router.push(`/listing/${listings.properties.id}`);
  }
  
  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView 
        animationEnabled
        style={styles.map} 
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily={Fonts.ubuntuMedium}
      >
        {listings.features.map((listing: GeoListing) => (
          <Marker
            key={listing.properties.id}
            onPress={() => onMarkerPress(listing)}
            coordinate={{
              latitude: listing.geometry.coordinates[1],
              longitude: listing.geometry.coordinates[0],
            }}
            title={listing.properties.name}
            description={listing.properties.description}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>€ {listing.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: Fonts.ubuntuMedium,
  },
});

export default ListingsMap