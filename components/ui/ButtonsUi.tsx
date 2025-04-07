import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import Colors from '@/constants/Colors'

const ButtonsUi = ({ 
    title, 
    icon, 
    colorMode, 
    disabled ,
    loading,
    btnAction
}: ButtonUiProps) => {

  return (
    <TouchableOpacity
        disabled={disabled || loading}
        onPress={btnAction}
    >
        <View style={ [styles.wrapper, colorMode === 'primary' ? styles.primary : styles.default ] } >
            <View style= { styles.icon } >
                { icon }
            </View>

            <View>
                { loading 
                ? (<ActivityIndicator size='small' color="#fff" />) 
                : (
                    <Text style={ [styles.title, { color: colorMode === 'primary' ? '#fff' : '#000' }] } >
                        { title }
                    </Text>    
                )}
            </View>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 50,
        marginBottom: 20,
        position: 'relative',
        boxShadow: `1px 3px 10px #E1E1E1FF`
    },

    primary: {
        backgroundColor: Colors.primary,
        color:  '#fff'
    },

    default: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        color: '#000'
    },

    title: {
        fontFamily: 'UbuntuBold',
        fontWeight: 500,
        fontSize: 16,
        paddingHorizontal: 20
    },

    icon: {
        position: 'absolute',
        left: 25
    }
})

export default ButtonsUi
