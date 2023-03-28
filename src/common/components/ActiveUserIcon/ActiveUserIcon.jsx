import "./ActiveUserIcon.css";
import UserIcon from "../UserIcon/UserIcon";

const ActiveUserIcon = ({size}) => {
    return (
        <div className="active-user-icon">
            <UserIcon size={size}/>
            <div className="active-indicator"></div>
        </div>
    );
};

export default ActiveUserIcon;