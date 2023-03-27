import "./UserIcon.css";

import userIconImage from "../../images/user.jpg";

const UserIcon = () => {
    return (
        <div className="user-icon">
            <img src={userIconImage} alt="user-icon" loading="lazy"/>
        </div>
    );
};

export default UserIcon;