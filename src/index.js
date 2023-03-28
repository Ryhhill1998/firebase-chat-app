import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css';
import Home from './routes/Home/Home';
import reportWebVitals from './reportWebVitals';
import Auth from "./routes/Auth/Auth";
import Chat, {chatLoader} from "./routes/Chat/Chat";
import ErrorPage from "./routes/ErrorPage/ErrorPage";
import ErrorComponent from "./common/components/ErrorComponent/ErrorComponent";

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
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
