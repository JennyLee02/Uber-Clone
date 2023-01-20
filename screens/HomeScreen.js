import React from 'react';
//use SafeAreaView to avoid information going into the notch
import { Text, StyleSheet, View, SafeAreaView, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'; 
import {GOOGLE_MAPS_APIKEY} from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';


const HomeScreen = () => {
    //dispatch shoots the action into the data layer.
        const dispatch = useDispatch();

    return (
        //can use tailwind and normal css together by using [] and styles.
        //<view> is react-native version of <div>
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5 bottom-5`}>
                <Image 
                    style={{
                        width: 100, 
                        height: 100, 
                        resizeMode: "contain",
                    }}
                    source={{
                        url: "https://links.papareact.com/gzs",
                    }}
                />

                <GooglePlacesAutocomplete
                    styles={{
                        container: {
                            flex: 0, 
                        },
                        textImput: {
                            fontSize: 18,
                        },
                    }}
                    //details are null unless fetchDetails is true.
                    onPress={(data, details = null) => {
                        dispatch(
                            setOrigin({
                            //get location information such as long and lad and store it in the redux store.
                                location: details.geometry.location,
                                description: data.description
                            })
                        );
                        dispatch(setDestination(null));
                    }}
                    //details are things like the coordinates
                    fetchDetails={true}
                    returnKeyType={"search"}
                    //gets rid of "Powered by Google" logo.
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en'
                    }}
                    placeholder="Where From?"
                    nearbyPlacesAPI="GooglePlacesSearch"
                    //deboucne will prevent it from executing search every second.
                    //debounce={400} will only search 400ms after stop typing.
                    debounce={400}
                />

                <NavOptions/>
                <NavFavourites/>
            </View>
        </SafeAreaView>
        
    );
}

export default HomeScreen



