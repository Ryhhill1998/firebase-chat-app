import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: JSON.parse(localStorage.getItem("userId")),
    displayName: null,
    iconColour: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        resetUserId: state => {
            state.userId = null;
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
export const selectUserId = state => state.user.userId;
export const selectDisplayName = state => state.user.displayName;
export const selectIconColour = state => state.user.iconColour;
export default userSlice.reducer