import { Colors, Fonts } from '@/constants'
import { View, Text, StyleSheet } from 'react-native'
import Animated, { SlideInDown } from 'react-native-reanimated'
import ButtonsUi from './ui/ButtonsUi'

const Pricing = ({scrapedDate, price}: {scrapedDate: string, price: number}) => {
  return (
    <Animated.View entering={SlideInDown.delay(1000)}>
        <View style={styles.wrapper}>
            <View>
                <Text style={{ fontFamily: Fonts.ubuntuBold, fontSize: Fonts.xlarge}}>
                    €{ price }.00 
                    <Text style={{ fontFamily: Fonts.ubuntuRegular, fontSize: Fonts.large}}> / night</Text>
                </Text>
                <Text style={{ marginTop: 5, fontFamily: Fonts.ubuntuRegular,}}>{ scrapedDate }</Text>
            </View>

            <ButtonsUi 
                title={'Reserve'} 
                colorMode='primary'
            />
        </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 30,
        borderWidth: 1,
        borderColor: '#DBD7D7FF',
    }
})

export default Pricing