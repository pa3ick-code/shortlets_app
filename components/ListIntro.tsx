import { View, Text } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@/constants';
import { Ionicons } from '@expo/vector-icons';

interface ListIntroProps {
    name: string;
    room_type: string;
    street: string;
    bedrooms: number;
    bathrooms: number;
    beds: number;
    guests_included: number;
    review_scores_rating: number;
    number_of_reviews: number;
}

const ListIntro = ({
    name,
    room_type,
    street,
    bedrooms,
    bathrooms,
    beds,
    guests_included,
    review_scores_rating,
    number_of_reviews,
    }: ListIntroProps) => {
  return (
    <View>
      <Text style={{ fontSize: Fonts.large, fontFamily: Fonts.ubuntuBold }}>
        {name}
      </Text>

      <View style={{ paddingVertical: 6 }}>
        <Text style={{ marginBottom: 6 }}>{room_type}.</Text>
        <Text
          style={{ marginBottom: 6, color: Colors.grey, fontSize: Fonts.small }}
        >
          {street}.
        </Text>
        <Text
          style={{
            color: Colors.grey,
            fontSize: Fonts.small,
            fontFamily: Fonts.ubuntuRegular,
          }}
        >
          {bedrooms} {bedrooms && bedrooms > 1 ? "Beds" : "Bed"} ・{bathrooms}{" "}
          {bathrooms && bathrooms > 1 ? "Bathrooms" : "Bathroom"} ・{beds}{" "}
          {beds && beds > 1 ? "Beds" : "Bed"} ・{guests_included}{" "}
          {guests_included && guests_included > 1 ? "Guests" : "Guest"}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 8,
          gap: 4,
        }}
      >
        <Ionicons name="star" size={13} />
        <Text
          style={{ fontFamily: Fonts.ubuntuRegular, fontSize: Fonts.small }}
        >
          {Number(review_scores_rating) / 20} •{" "}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.ubuntuMedium,
            borderBottomWidth: 1,
            fontSize: Fonts.small,
          }}
        >
          {number_of_reviews} Reviews
        </Text>
      </View>
    </View>
  );
}

export default ListIntro