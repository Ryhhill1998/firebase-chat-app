import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allChats: null,
};

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setAllChats: (state, action) => {
            state.allChats = action.payload;
        }
    }
});

export const {setAllChats} = chatsSlice.actions;
export const selectAllChats = state => state.chats.allChats;
export default chatsSlice.reducer;