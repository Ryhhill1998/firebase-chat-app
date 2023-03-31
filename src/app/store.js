import { configureStore } from '@reduxjs/toolkit';

import userReducer from "../features/user/userSlice";
import changeIconPopupReducer from "../features/changeIconPopup/changeIconPopupSlice";
import searchReducer from "../features/search/searchSlice";
import chatsReducer from "../features/chats/chatsSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        changeIconPopup: changeIconPopupReducer,
        search: searchReducer,
        chats: chatsReducer,
    },
});