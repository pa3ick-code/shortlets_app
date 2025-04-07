
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

// constants/index.ts
import Colors from "./Colors";
import Fonts from "./Fonts";
import { GlobalStyles } from "./GlobalStyles";

export { Colors, Fonts, GlobalStyles };


// categories.js
export const categories = [
  {
    id: "1",
    name: "Beach front",
    icon: "umbrella-beach", 
    library: MaterialCommunityIcons,
  },
  {
    id: "2",
    name: "Cabins",
    icon: "cabin", // MaterialIcons
    library: MaterialIcons,
  },
  {
    id: "3",
    name: "Tiny homes",
    icon: "home", // MaterialCommunityIcons
    library: MaterialCommunityIcons,
  },
  {
    id: "4",
    name: "Luxe",
    icon: "diamond-stone", // MaterialCommunityIcons (closest match)
    library: MaterialCommunityIcons,
  },
  {
    id: "5",
    name: "Treehouses",
    icon: "pine-tree", // MaterialCommunityIcons
    library: MaterialCommunityIcons,
  },
  {
    id: "6",
    name: "Camping",
    icon: "tent", // MaterialCommunityIcons
    library: MaterialCommunityIcons,
  },
  {
    id: "7",
    name: "Countryside",
    icon: "nature-people", // MaterialCommunityIcons
    library: MaterialCommunityIcons,
  },
  {
    id: "8",
    name: "Mansions",
    icon: "home-modern", // MaterialCommunityIcons
    library: MaterialCommunityIcons,
  },
  {
    id: "9",
    name: "Ski-in/out",
    icon: "ski", // MaterialCommunityIcons
    library: MaterialCommunityIcons,
  },
  {
    id: "10",
    name: "Castles",
    icon: "castle", // MaterialCommunityIcons
    library: MaterialCommunityIcons,
  },
  {
    id: "11",
    name: "Trending",
    icon: "fire", // MaterialCommunityIcons
    library: MaterialCommunityIcons,
  },
  {
    id: "12",
    name: "Amazing views",
    icon: "image-filter-hdr", // MaterialCommunityIcons
    library: MaterialCommunityIcons,
  },
  {
    id: "13",
    name: "Islands",
    icon: "island", // MaterialCommunityIcons
    library: MaterialCommunityIcons,
  },
  {
    id: "14",
    name: "Farms",
    icon: "barn", // MaterialCommunityIcons
    library: MaterialCommunityIcons,
  },
  {
    id: "15",
    name: "Bed & breakfasts",
    icon: "coffee-outline", // MaterialCommunityIcons (closest to breakfast)
    library: MaterialCommunityIcons,
  },
  {
    id: "16",
    name: "Lakefront",
    icon: "waves", // MaterialCommunityIcons
    library: MaterialCommunityIcons,
  },
  {
    id: "17",
    name: "A-frames",
    icon: "home-group", // MaterialCommunityIcons
    library: MaterialCommunityIcons,
  },
  {
    id: "18",
    name: "Off-the-grid",
    icon: "power-plug-off-outline", // MaterialCommunityIcons
    library: MaterialCommunityIcons,
  },
  {
    id: "19",
    name: "Houseboats",
    icon: "ferry", // MaterialCommunityIcons
    library: MaterialCommunityIcons,
  },
  {
    id: "20",
    name: "Design",
    icon: "palette", // MaterialCommunityIcons
    library: MaterialCommunityIcons,
  },
] as const;

export type CategoryName = typeof categories[number]["name"];



