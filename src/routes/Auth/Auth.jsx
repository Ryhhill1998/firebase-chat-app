import "./Auth.css";

import logoImgSrc from "../../common/images/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {useNavigate} from "react-router-dom";

const Auth = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
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