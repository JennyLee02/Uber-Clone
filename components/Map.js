import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from "react-native-maps";
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectDestination, selectOrigin, setOrigin, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from "react-native-maps-directions"
import {GOOGLE_MAPS_APIKEY} from "@env"
import { useRef } from 'react';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    //useRef directly creates a reference to the DOM element in the functional component
    const mapRef = useRef(null);
    //because of useEffect, whenever the dependecies changes, it is going to rerun the code
    const dispatch = useDispatch();

    useEffect(() => {
        //if there is no origin or destination, return immediately and do not carry on.
        if(!origin || !destination) return;

        //zoom and fit to markers
        //For ios, fitToElements works better than fitToSuppliedMarkers
        mapRef.current.fitToElements(['origin', 'destination'], {
            //this will avoid markers touching side to side
            edgePadding: {top: 50, right: 50, left: 50, bottom: 50}
        });
    }, [origin, destination]);
    
    useEffect(()=>{
        if(!origin || !destination) return;
        
        const getTravelTime = async()=>{
            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
            )
                .then((res) => res.json())
                .then((data) => {
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
            }); 
        };

        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_APIKEY]);

    return (
        <MapView
            ref = {mapRef}
            style={tw`flex-1`}
            mapType="mutedStandard"
            initialRegion={{
                latitude: origin?.location?.lat ?? 0,  // use fallback value that makes sense
                longitude: origin?.location?.lng ?? 0, // use fallback value that makes sense
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
            // if there is both origin and destination (below code)
        >

            {origin && destination && (
                <MapViewDirections
                    origin = {origin.description}
                    destination = {destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    //stroke of the direction line
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}  

            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin?.location?.lat ?? 0,  // use fallback value that makes sense
                        longitude: origin?.location?.lng ?? 0,
                    }}
                    title="Origin"
                    description={origin?.description}   
                    identifier="origin"
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination?.location?.lat ?? 0,  // use fallback value that makes sense
                        longitude: destination?.location?.lng ?? 0,
                    }}
                    title="Destination"
                    description={destination?.description}   
                    identifier="Destination"
                />
            )}  
        </MapView>
    );
};

export default Map;
