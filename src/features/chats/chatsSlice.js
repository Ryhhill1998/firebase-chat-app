import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    chats: null,
    openChatId: null,
};

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setAllChats: (state, action) => {
            state.chats = action.payload;
        },
        setOpenChatId: (state, action) => {
            state.openChatId = action.payload;
        },
    }
})

export const {setAllChats, setOpenChatId} = chatsSlice.actions
export const selectAllChats = state => state.chats.chats;
export const selectOpenedChat = state => state.chats.chats?.find(chat => chat.id === state.chats.openChatId);
export default chatsSlice.reducer