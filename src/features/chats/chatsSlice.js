import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    chats: null
};

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setAllChats: (state, action) => {
            state.chats = action.payload;
        }
    }
})

export const {setAllChats} = chatsSlice.actions
export const selectAllChats = state => state.chats.chats;
export default chatsSlice.reducer