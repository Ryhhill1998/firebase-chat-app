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
import { Provider } from 'react-redux'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/auth",
        element: <Auth/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/chats/:id",
        element: <Chat/>,
        errorElement: <ErrorComponent />,
        loader: chatLoader
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
