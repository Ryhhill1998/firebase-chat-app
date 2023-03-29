import "./ActiveUserIcon.css";
import UserIcon from "../UserIcon/UserIcon";

const ActiveUserIcon = ({size, handleClick}) => {
    return (
        <div className="active-user-icon" onClick={handleClick}>
            <UserIcon size={size}/>
            <div className="active-indicator"></div>
        </div>
    );
};

export default ActiveUserIcon;