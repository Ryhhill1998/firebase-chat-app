import "./Auth.css";

import logoImgSrc from "../../common/images/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {createUserDoc, signInWithGooglePopup} from "../../utils/firebase";
import {useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Auth = () => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);

    useEffect(() => {
        if (userId) {
            navigate("/");
        }
    }, [userId]);

    const handleClick = async () => {
        const user = await signInWithGooglePopup()
        const {uid, displayName, email} = user;
        const data = {displayName, email};
        await createUserDoc(data, uid);
    };

    return (
        <div className="auth-container container">
            <header>
                <h1>Welcome to Taco Chat!</h1>

                <div className="logo-container">
                    <img src={logoImgSrc} alt="logo"/>
                </div>
            </header>

            <button onClick={handleClick}>
                Google sign in
                <FontAwesomeIcon className="icon" icon={faGoogle}/>
            </button>
        </div>
    );
};

export default Auth;