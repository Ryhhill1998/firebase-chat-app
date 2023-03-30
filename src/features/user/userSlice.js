import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: JSON.parse(localStorage.getItem("userId")),
    chats: []
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
        setChats: (state, action) => {
            state.chats = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const {setUserId, resetUserId, setChats} = userSlice.actions
export const selectUserId = state => state.user.userId;
export const selectChats = state => state.user.chats;
export default userSlice.reducer