import "./UserIcon.css";

import userIconImage from "../../images/user.png";

const sizesMap = {
    xSmall: "20px",
    small: "25px",
    medium: "40px",
    large: "60px",
    xLarge: "80px",
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