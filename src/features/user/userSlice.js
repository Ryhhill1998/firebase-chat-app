import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: null
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
        }
    }
})

// Action creators are generated for each case reducer function
export const {setUserId, resetUserId} = userSlice.actions
export const selectUserId = state => state.user.userId;
export default userSlice.reducer