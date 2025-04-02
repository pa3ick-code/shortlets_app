import { Colors, Fonts } from "@/constants";
import { View, Text, StyleSheet } from "react-native";

type toastConfigProps = {
    text1?: string,
    text2?: string,
    type?: string,
}

export const toastConfig = {
  success: (message: toastConfigProps) => (
    <View style={styles.wrapper}>
      <Text style={styles.text1}>{message.text1}</Text>
      <Text style={styles.text2}>{message.text2}</Text>
    </View>
  ),
  error: (message: toastConfigProps) => (
    <View style={styles.wrapper}>
      <Text style={styles.text1}>{message.text1}</Text>
      <Text style={styles.text2}>{message.text2}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
    wrapper: { 
        backgroundColor: Colors.success, 
        padding: 15, 
        borderRadius: 10,
    },
    text1: { 
        color: 'white', 
        fontFamily: Fonts.ubuntuBold, 
        fontSize: Fonts.large 
    },
    text2: { 
        color: 'white', 
        fontFamily: Fonts.ubuntuRegular, 
        fontSize: Fonts.medium 
    },
})