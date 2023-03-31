import {useDispatch, useSelector} from "react-redux";
import {onAuthStateChanged} from "firebase/auth";
import {auth, getUserFromUserId} from "../utils/firebase";
import {resetUserId, selectUserId, setDisplayName, setIconColour, setUserId} from "../features/user/userSlice";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";

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
                    dispatch(setDisplayName(user.displayName));
                    dispatch(setIconColour(user.iconColour));
                });
        }
    }, [userId]);

    return (
        <>
            <Outlet/>
        </>
    );
};

export default Root;