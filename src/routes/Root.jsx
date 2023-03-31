import {useDispatch, useSelector} from "react-redux";
import {onAuthStateChanged} from "firebase/auth";
import {auth, getUserFromUserId, listenToAllUserChats} from "../utils/firebase";
import {resetUserId, selectUserId, setDisplayName, setIconColour, setUserId} from "../features/user/userSlice";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {setAllChats} from "../features/chats/chatsSlice";

const Root = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = useSelector(selectUserId);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                dispatch(resetUserId());
            } else {
                dispatch(setUserId(user.uid));
            }
        });
    }, []);

    useEffect(() => {
        if (!userId) {
            navigate("/auth");
            localStorage.removeItem("userId");
        } else {
            localStorage.setItem("userId", JSON.stringify(userId));
            getUserFromUserId(userId)
                .then(user => {
                    if (!user) return;
                    dispatch(setDisplayName(user.displayName));
                    dispatch(setIconColour(user.iconColour));
                });
        }
    }, [userId]);

    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (!userId) return;
        listenToAllUserChats(userId, setChats);
    }, [userId]);

    useEffect(() => {
        if (!chats) return;

        dispatch(setAllChats(chats));
    }, [chats]);

    return (
        <>
            <Outlet/>
        </>
    );
};

export default Root;