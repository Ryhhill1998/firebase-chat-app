import "./UserIcon.css";

import userIconImage from "../../images/user.jpg";

const sizesMap = {
    tiny: "20px",
    small: "30px",
    medium: "40px",
    large: "60px",
}

const UserIcon = ({size}) => {

    const dimensions = sizesMap[size];

    return (
        <div className="user-icon" style={{height: dimensions, width: dimensions}}>
            <img src={userIconImage} alt="user-icon" loading="lazy"/>
        </div>
    );
};

export default UserIcon;