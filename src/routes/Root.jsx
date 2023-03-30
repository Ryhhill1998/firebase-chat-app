import {useDispatch, useSelector} from "react-redux";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../utils/firebase";
import {resetUserId, selectUserId, setUserId} from "../features/user/userSlice";
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
        }
    }, [userId]);

    return (
        <>
            <Outlet/>
        </>
    );
};

export default Root;