import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import Map from '../components/Map';
import MapView from 'react-native-maps';
import {createStackNavigator} from '@react-navigation/stack'
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';


const MapScreen = () => {
    const Stack = createStackNavigator();
    
    return (
        
        <View>
            <TouchableOpacity style={tw`absolute top-16 left-8 bg-gray-100 z-50 p-3 rounded-full shadow-lg`}>
                <Icon name="menu" />
            </TouchableOpacity>

            <View style={tw`h-1/2`}>
                <Map/>
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </View>
        </View>
    
        
    )
}

export default MapScreen
