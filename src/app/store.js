import { configureStore } from '@reduxjs/toolkit';

import userReducer from "../features/user/userSlice";
import changeIconPopupReducer from "../features/changeIconPopup/changeIconPopupSlice";
import searchReducer from "../features/search/searchSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        changeIconPopup: changeIconPopupReducer,
        search: searchReducer,
    },
});