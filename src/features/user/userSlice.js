import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: JSON.parse(localStorage.getItem("userId")),
    displayName: null
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
        }
    }
})

// Action creators are generated for each case reducer function
export const {setUserId, resetUserId, setDisplayName} = userSlice.actions
export const selectUserId = state => state.user.userId;
export const selectDisplayName = state => state.user.displayName;
export default userSlice.reducer