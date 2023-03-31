import "./UserIconButton.css";
import UserIcon from "../UserIcon/UserIcon";

const UserIconButton = ({colour, selected}) => {
    return (
        <button className="selected">
            <UserIcon size="large"/>
        </button>
    );
};

export default UserIconButton;