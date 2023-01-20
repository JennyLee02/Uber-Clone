import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //starting place --> "Where you are at the moment"
    origin: null,
    //destination --> "Where you want to go to"
    destination: null,
    // Travel time from origin to destination
    travelTimeInformation: null
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
    },
});

export const {setOrigin, setDestination, setTravelTimeInformation} = navSlice.actions;


//selectors
//If I call 'selectOrigin', it is going to give in the current state of origin
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;

export default navSlice.reducer;

/*import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null
}

export const navSlice = createSlice({
    name: 'nav',
    initialState: initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
    },
});

export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;


// Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation


export default navSlice.reducer;*/