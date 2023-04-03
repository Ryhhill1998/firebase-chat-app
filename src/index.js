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
import Chat from "./routes/Chat/Chat";
import ErrorPage from "./routes/ErrorPage/ErrorPage";
import ErrorComponent from "./routes/Chat/ErrorComponent/ErrorComponent";

import store from './app/store'
import {Provider} from 'react-redux'
import Root from "./routes/Root";
import Profile from "./routes/Profile/Profile";
import Search from "./routes/Search/Search";
import NewMessage from "./routes/NewMessage/NewMessage";
import MatchedMessages from "./routes/MatchedMessages/MatchedMessages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/auth",
                element: <Auth/>,
            },
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/chats/:id",
                element: <Chat/>,
                errorElement: <ErrorComponent/>,
            },
            {
                path: "/profile",
                element: <Profile/>,
            },
            {
                path: "/search",
                element: <Search/>,
            },
            {
                path: "/new-message",
                element: <NewMessage/>,
            },
            {
                path: "/matched-messages/:chatId",
                element: <MatchedMessages/>,
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
