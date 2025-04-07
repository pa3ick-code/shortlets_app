import { categories, CategoryName, Colors } from '@/constants'
import { useCategoryStore } from '@/store/store';
import { useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, } from 'react-native'

const CategoryScrollView = () => {
    const flatListRef = useRef<FlatList>(null);
    const [scrollIndex, setScrollIndex] = useState(0);
     const setSelectedCategory = useCategoryStore(state => state.setSelectedCategory);

    const handleScelection = (index: number, name: CategoryName) => {
        setScrollIndex(index);
        setSelectedCategory(name);

        flatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0, 
        });
    }

  return (
    <View style={{paddingHorizontal: 10}}>
      <FlatList 
        ref={flatListRef}
        data={ categories }
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
            const IconComponent = item.library;
            const isSelected = scrollIndex === index;

            return (
                <TouchableOpacity 
                    style={[styles.wrapper,{ borderBottomWidth: isSelected ? 2 : 0} ]}
                    onPress={() => handleScelection(index, item.name)} 
                >
                    <IconComponent
                        name={item.icon as any} 
                        size={24} 
                        color={ isSelected ? '#000' : Colors.grey} 
                    />

                    <Text style={[styles.catName, { color: isSelected ? '#000' : Colors.grey }]}> 
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }}
        contentContainerStyle={{ alignItems: 'center' }}
        ItemSeparatorComponent={() => <View style={{ width: 15 }} />} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
    
    wrapper: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },

    catName: { 
        fontSize: 10, 
        textAlign: 'center', 
        marginTop: 2, 
        fontFamily: 'UbuntuRegular' ,
        color: Colors.grey,
    }
})

export default CategoryScrollView