import "./Profile.css";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faChevronLeft, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {
    selectDisplayName,
    selectIconColour,
    selectUserId,
    setDisplayName,
    setIconColour
} from "../../features/user/userSlice";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {signOutUser, updateUserDisplayName, updateUserIconColour} from "../../utils/firebase";
import UserIconButton from "../../common/components/UserIconButton/UserIconButton";

const Profile = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const currentDisplayName = useSelector(selectDisplayName);
    const iconColour = useSelector(selectIconColour);

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

    const handleSignOutClick = async () => {
        await signOutUser();
    };

    const [iconButtons, setIconButtons] = useState([
        {colour: "#FF2E63", selected: false},
        {colour: "#19A7CE", selected: false},
        {colour: "#FE6244", selected: false},
        {colour: "#AA77FF", selected: false},
        {colour: "#E21818", selected: false},
        {colour: "#5D9C59", selected: false}
    ]);

    useEffect(() => {
        if (!iconColour) return;

        setIconButtons(iconButtons => {
            const updatedIconButtons = [...iconButtons];
            updatedIconButtons.find(button => button.colour === iconColour).selected = true;
            return updatedIconButtons;
        })
    }, [iconColour]);

    const handleIconButtonClick = (index) => {
        setIconButtons(iconButtons => {
            const updatedIconButtons = [...iconButtons].map(button => {
                button.selected = false;
                return button;
            });

            updatedIconButtons[index].selected = true;
            return updatedIconButtons;
        });
    };

    const [popupVisible, setPopupVisible] = useState(false);

    const handleChangeIconClick = () => {
        setPopupVisible(true);
    }

    const handleClosePopupClick = () => {
        setPopupVisible(false);
        handleResetPopupClick();
    };

    const handleResetPopupClick = () => {
        setIconButtons(iconButtons => {
            return [...iconButtons].map((button, i) => {
                button.selected = i === 0;
                return button;
            });
        });
    };

    const handleSavePopupClick = () => {
        const newIconColour = iconButtons.find(button => button.selected).colour;
        updateUserIconColour(userId, newIconColour)
            .then(() => {
                dispatch(setIconColour(newIconColour));
                handleClosePopupClick();
            });
    };

    return (
        <div className="profile-container container">
            <header>
                <button onClick={handleBackClick}>
                    <FontAwesomeIcon className="icon" icon={faChevronLeft}/>
                </button>

                <h1>Edit Profile</h1>

                <button onClick={handleSaveClick}  style={saveButtonStyle}>
                    <FontAwesomeIcon className="icon" icon={faCircleCheck}/>
                </button>
            </header>

            <section className="change-icon-section">
                {iconColour && <UserIcon size="xLarge" colour={iconColour}/>}
                <button onClick={handleChangeIconClick}>
                    Change icon
                    <FontAwesomeIcon className="icon" icon={faPenToSquare}/>
                </button>

                {popupVisible && (
                    <div className="change-icon-popup">
                        <div className="popup-buttons">
                            <button onClick={handleClosePopupClick}>Close</button>
                            <button onClick={handleResetPopupClick}>Reset</button>
                        </div>

                        <h2>Choose an icon</h2>

                        <div className="icons-container">
                            {iconButtons.map((button, i) => (
                                <UserIconButton
                                    key={i}
                                    colour={button.colour}
                                    index={i}
                                    selected={button.selected}
                                    handleClick={handleIconButtonClick}
                                />
                            ))}
                        </div>

                        <button className="apply-button" onClick={handleSavePopupClick}>Save</button>
                    </div>
                )}
            </section>

            <section className="change-details-section">
                <label>
                    Display name
                    <input type="text" value={name} onChange={handleDisplayNameChange}/>
                </label>
            </section>

            <button className="sign-out-button" onClick={handleSignOutClick}>
                <FontAwesomeIcon className="icon" icon={faArrowRightFromBracket}/>
                Sign out
            </button>
        </div>
    );
};

export default Profile;