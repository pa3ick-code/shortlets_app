import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Fonts } from '@/constants';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface ListDetailsProps {
    host_picture_url: string;
    host_name: string;
    host_location: string;
    host_since: string;
    neighborhood_overview: string;
    description: string;
}

const ListDetail = ({
    host_picture_url,
    host_name,
    host_location,
    host_since,
    neighborhood_overview,
    description,
    }: ListDetailsProps
) => {

    const [showFullText, setShowFullText] = useState(false);
    const [showFullTextOverview, setShowFullTextOverview] = useState(false);

  return (
    <View>
      <View style={{ marginTop: 16 }}>
        {/* host info */}
        <View style={styles.authorWrapper}>
          <View style={{ flexDirection: "row", marginBottom: 8, gap: 20 }}>
            <Image
              source={{ uri: host_picture_url }}
              style={{
                height: 45,
                width: 45,
                borderRadius: 100,
                borderWidth: 2,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontFamily: Fonts.ubuntuBold, fontSize: Fonts.large }}
              >
                {host_name}
              </Text>
              <Text>{host_location}</Text>
              <Text>Hosting since {host_since}</Text>
            </View>
          </View>
        </View>

        {/*overview */}
        <View
          style={[
            styles.authorWrapper,
            { borderBottomWidth: 1, borderColor: "#DBD7D7FF" },
          ]}
        >
          <View style={{ flexDirection: "row", marginBottom: 8, gap: 20 }}>
            <Ionicons name="diamond-outline" size={40} color="#0F37FFFF" />
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontFamily: Fonts.ubuntuBold, fontSize: Fonts.large }}
              >
                Overview
              </Text>
              <Text
                style={{ fontFamily: Fonts.ubuntuRegular }}
                numberOfLines={showFullTextOverview ? undefined : 5}
              >
                {neighborhood_overview}
              </Text>
              <TouchableOpacity
                onPress={() => setShowFullTextOverview((prev) => !prev)}
              >
                <Text
                  style={{ fontFamily: Fonts.ubuntuBold, textAlign: "left" }}
                >
                  {showFullTextOverview ? "Show less." : "Show more."}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* description */}
      <View style={{ paddingVertical: 16 }}>
        <View style={{ flexDirection: "row", marginBottom: 8, gap: 20 }}>
          <Ionicons name="document-text-outline" size={40} color="#0F37FFFF" />
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontFamily: Fonts.ubuntuBold, fontSize: Fonts.large }}
            >
              Description
            </Text>

            <Text
              style={{ fontFamily: Fonts.ubuntuRegular }}
              numberOfLines={showFullText ? undefined : 5}
            >
              {description}
            </Text>

            <TouchableOpacity onPress={() => setShowFullText((prev) => !prev)}>
              <Text style={{ fontFamily: Fonts.ubuntuBold, textAlign: "left" }}>
                {showFullText ? "Show less." : "Show more."}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  authorWrapper: {
    borderTopWidth: 1,
    paddingVertical: 16,
    borderColor: "#DBD7D7FF",
  },
});
export default ListDetail