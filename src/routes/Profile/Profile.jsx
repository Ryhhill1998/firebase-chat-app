import "./Profile.css";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {selectDisplayName, selectUserId, setDisplayName} from "../../features/user/userSlice";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {updateUserDisplayName} from "../../utils/firebase";

const Profile = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const currentDisplayName = useSelector(selectDisplayName);

    const [name, setName] = useState("");
    const [saveButtonStyle, setSaveButtonStyle] = useState({visibility: "visible"});

    useEffect(() => {
        if (!currentDisplayName) return;

        setName(currentDisplayName);
    }, [currentDisplayName]);

    useEffect(() => {
        if (name === currentDisplayName) {
            setSaveButtonStyle(saveButtonStyle => {
                const updatedStyle = {...saveButtonStyle};
                updatedStyle.visibility = "hidden";
                return updatedStyle;
            });
        } else {
            setSaveButtonStyle(saveButtonStyle => {
                const updatedStyle = {...saveButtonStyle};
                updatedStyle.visibility = "visible";
                return updatedStyle;
            });
        }
    }, [currentDisplayName, name]);

    const handleBackClick = () => {
        navigate("/");
    };

    const handleSaveClick = () => {
        // update user doc to have new display name
        updateUserDisplayName(userId, name)
            .then(() => dispatch(setDisplayName(name)));
    };

    const handleDisplayNameChange = ({target}) => {
        const {value} = target;
        setName(value);
    };

    return (
        <div className="profile-container container">
            <header>
                <button onClick={handleBackClick}>
                    <FontAwesomeIcon className="icon" icon={faChevronLeft}/>
                </button>

                <h1>Edit Profile</h1>

                <button onClick={handleSaveClick}>
                    <FontAwesomeIcon className="icon" icon={faCircleCheck} style={saveButtonStyle}/>
                </button>
            </header>

            <section className="change-icon-section">
                <UserIcon size="xLarge"/>
                <button>Change icon</button>
            </section>

            <section className="change-details-section">
                <label>
                    Display name
                    <input type="text" value={name} onChange={handleDisplayNameChange}/>
                </label>
            </section>
        </div>
    );
};

export default Profile;