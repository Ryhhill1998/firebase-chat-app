import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: JSON.parse(localStorage.getItem("userId")),
    displayName: null,
    iconColour: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.id = action.payload;
        },
        resetUserId: state => {
            state.id = null;
        },
        setDisplayName: (state, action) => {
            state.displayName = action.payload;
        },
        setIconColour: (state, action) => {
            state.iconColour = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const {setUserId, resetUserId, setDisplayName, setIconColour} = userSlice.actions
export const selectUserId = state => state.user.id;
export const selectDisplayName = state => state.user.displayName;
export const selectIconColour = state => state.user.iconColour;
export default userSlice.reducer