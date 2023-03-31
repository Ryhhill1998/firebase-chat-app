import { configureStore } from '@reduxjs/toolkit';

import userReducer from "../features/user/userSlice";
import changeIconPopupReducer from "../features/changeIconPopup/changeIconPopupSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        changeIconPopup: changeIconPopupReducer,
    },
});