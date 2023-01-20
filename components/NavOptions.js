import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const data = [
    {
        id: "123",
        title: "Get a ride",
        image: "https://links.papareact.com/3pn",
        //once we hit the button, which screen will it show?
        screen: "MapScreen",
    },
    {
        id: "456",
        title: "Order food",
        image: "https://links.papareact.com/28w",
        screen: "EatsScreen",

    },
];


const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);
    
    return (
        <FlatList
        data={data}
        keyExtractor={(item)=> item.id}
        horizontal
        renderItem={({item}) => (
            <TouchableOpacity 
            onPress={() => navigation.navigate(item.screen)}
            style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
            //TouchableOpacity will be disabled if there is no origin.
            //tw style: if there is no origin, opacity is set to 20.
            disabled={!origin}>
                <View style={tw`${!origin && "opacity-20"}`}>
                    <Image
                    style={{width: 120, height: 120, resizeMode: "contain"}}
                    source={{url: item.image}}
                    />
                    <Text style={tw`mt-2 text-lg font-semibold ml-3`}>{item.title}</Text>
                    <Icon
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`} 
                        name="arrowright"
                        color="white"
                        type="antdesign"
                    />
                </View>
            </TouchableOpacity>
        )}
        />
        
        
    );
}

export default NavOptions

