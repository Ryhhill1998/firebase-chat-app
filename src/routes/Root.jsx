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
            console.log("User:", user);
            if (!user) {
                dispatch(resetUserId());
                navigate("/auth");
            } else {
                dispatch(setUserId(user.uid));
                navigate("/");
            }
        });
    }, []);

    return (
        <>
            <Outlet/>
        </>
    );
};

export default Root;