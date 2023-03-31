import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import Home from './routes/Home/Home';
import Auth from "./routes/Auth/Auth";
import Chat, {chatLoader} from "./routes/Chat/Chat";
import ErrorPage from "./routes/ErrorPage/ErrorPage";
import ErrorComponent from "./common/components/ErrorComponent/ErrorComponent";

import store from './app/store'
import {Provider} from 'react-redux'
import Root from "./routes/Root";
import Profile from "./routes/Profile/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/auth",
                element: <Auth/>,
            },
            {
                path: "/chats/:id",
                element: <Chat/>,
                loader: chatLoader,
                errorElement: <ErrorComponent/>,
            },
            {
                path: "/profile",
                element: <Profile/>,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
