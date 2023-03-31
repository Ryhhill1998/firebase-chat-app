import "./Auth.css";

import logoImgSrc from "../../common/images/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {createUserDoc, signInWithFacebookPopup, signInWithGooglePopup, userDocExists} from "../../utils/firebase";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId, setDisplayName, setIconColour} from "../../features/user/userSlice";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Auth = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    useEffect(() => {
        if (userId) {
            navigate("/");
        }
    }, [userId]);

    const getRandomColour = () => {
        const colours = ["#FF2E63", "#19A7CE", "#FE6244", "#AA77FF", "#E21818", "#5D9C59"];
        const randomIndex = Math.floor(Math.random() * colours.length);
        return colours[randomIndex];
    };

    const createNewUserInDatabase = async (user) => {
        const {uid, displayName, email} = user;

        if (await userDocExists(uid)) return;

        const iconColour = getRandomColour();

        const data = {displayName, email, iconColour};
        await createUserDoc(data, uid);

        dispatch(setDisplayName(displayName));
        dispatch(setIconColour(iconColour));
    };

    const handleGoogleSignInClick = async () => {
        const user = await signInWithGooglePopup()
        await createNewUserInDatabase(user);
    };

    const handleFacebookSignInClick = async () => {
        const user = await signInWithFacebookPopup();
        await createNewUserInDatabase(user);
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