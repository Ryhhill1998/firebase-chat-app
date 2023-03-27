import "./ActiveUserIcon.css";
import UserIcon from "../UserIcon/UserIcon";

const ActiveUserIcon = () => {
    return (
        <div className="active-user-icon">
            <UserIcon/>
            <div className="active-indicator"></div>
        </div>
    );
};

export default ActiveUserIcon;