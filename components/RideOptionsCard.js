import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text, View, Image } from "react-native";
import { Icon } from "react-native-elements";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data=[
    {
        id: "Uber-X-123",
        title: "UberX",
        //multiplier: cost multiplier
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
];

//if we have surge charge, this goes up
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    console.log(travelTimeInformation);

    return(
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity 
                    onPress={()=> navigation.navigate("NavigateCard")}
                    style={tw`absolute top-3 left-5 p-3 rounded-full`}
                >
                    <Icon name="chevron-left" type="fontawesome"/>
                </TouchableOpacity>
                <Text style={tw`text-center py-3 text-xl`}>
                    Select a Ride - {travelTimeInformation?.distance?.text}
                </Text>
            </View>
            
            <FlatList data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item:{id, title, multiplier, image}, item})=>(
                <TouchableOpacity 
                onPress={()=>setSelected(item)}
                //if the id of the thing that is wrapping through is equal to the selected, then set bg to gray200.
                style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`}>
                    <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain",
                    }}
                    source={{url: image}}/>
                    <View style={tw`-ml-6`}>
                        <Text style={tw`text-xl font-semibold`}>{title}</Text>
                        <Text style={tw`text-xs`}>Travel Time {travelTimeInformation?.duration?.text}</Text>
                    </View>
                    <Text style={tw`text-xl`}>
                        {new Intl.NumberFormat('en-us', {
                            style: 'currency',
                            currency: 'CAD'
                        }).format(
                            (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100
                        )}

                    </Text>
                </TouchableOpacity>
            )}
            
            />
            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity 
                //disable if there is no selected
                disabled={!selected}
                //if there is no selected, bg is gray300
                style={tw`bg-black py-3 mx-6 ${!selected && "bg-gray-300"}`}>
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard