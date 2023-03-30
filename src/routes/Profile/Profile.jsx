import "./Profile.css";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import {useSelector} from "react-redux";
import {selectDisplayName} from "../../features/user/userSlice";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();

    const currentDisplayName = useSelector(selectDisplayName);

    const [displayName, setDisplayName] = useState("");

    const handleBackClick = () => {
        navigate("/");
    };

    const handleSaveClick = () => {
        // update user doc to have new display name
    };

    const handleDisplayNameChange = ({target}) => {
        setDisplayName(target.value);
    };

    return (
        <div className="profile-container container">
            <header>
                <button onClick={handleBackClick}>
                    <FontAwesomeIcon className="icon" icon={faChevronLeft}/>
                </button>

                <h1>Edit Profile</h1>

                <button onClick={handleSaveClick}>
                    <FontAwesomeIcon className="icon" icon={faCircleCheck}/>
                </button>
            </header>

            <section className="change-icon-section">
                <UserIcon size="xLarge"/>
                <button>Change icon</button>
            </section>

            <section className="change-details-section">
                <label>
                    Display name
                    <input type="text" value={currentDisplayName + ""} onChange={handleDisplayNameChange}/>
                </label>
            </section>
        </div>
    );
};

export default Profile;