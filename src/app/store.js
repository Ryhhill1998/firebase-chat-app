import { configureStore } from '@reduxjs/toolkit';

import userReducer from "../../src/features/user/userSlice";

export default configureStore({
    reducer: {
        user: userReducer,
    },
});