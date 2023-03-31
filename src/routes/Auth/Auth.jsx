import "./Auth.css";

import logoImgSrc from "../../common/images/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {createUserDoc, signInWithFacebookPopup, signInWithGooglePopup} from "../../utils/firebase";
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

    const handleGoogleSignInClick = async () => {
        const user = await signInWithGooglePopup()
        const {uid, displayName, email} = user;
        const data = {displayName, email};
        await createUserDoc(data, uid);
    };

    const handleFacebookSignInClick = async () => {
        const user = await signInWithFacebookPopup();
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

            <button onClick={handleGoogleSignInClick}>
                <span>Sign in</span>
                <FontAwesomeIcon className="icon" icon={faGoogle} size="2x"/>
            </button>

            <button onClick={handleFacebookSignInClick}>
                <span>Sign in</span>
                <FontAwesomeIcon className="icon" icon={faFacebook} size="2x"/>
            </button>
        </div>
    );
};

export default Auth;