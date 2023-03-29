import "./Auth.css";

import logoImgSrc from "../../common/images/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {createUserDoc, signInWithGooglePopup} from "../../utils/firebase";

const Auth = () => {

    const handleClick = async () => {
        const user = await signInWithGooglePopup()
        const {uid, displayName, email, photoURL: photoUrl} = user;
        const data = {uid, displayName, email, photoUrl};
        await createUserDoc(data);
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