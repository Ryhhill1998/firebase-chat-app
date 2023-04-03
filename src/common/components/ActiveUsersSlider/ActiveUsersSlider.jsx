import "./ActiveUsersSlider.css";
import ActiveUserIcon from "../ActiveUserIcon/ActiveUserIcon";
import {useEffect, useState} from "react";
import {useSwipeable} from "react-swipeable";
import {getAllUsers} from "../../../utils/firebase";
import {useSelector} from "react-redux";
import {selectUserId} from "../../../features/user/userSlice";

const ActiveUsersSlider = () => {

    const userId = useSelector(selectUserId);

    const [style, setStyle] = useState({transform: `translateX(0px)`});
    const [xPosition, setXPosition] = useState(0);
    const [offsetX, setOffsetX] = useState(0);
    const [activeUsers, setActiveUsers] = useState([]);

    const sliderWidth = (60 * activeUsers.length) + (1.25 * 16 * (activeUsers.length - 1));
    const contentWidth = (window.innerWidth > 500 ? 500 : window.innerWidth) - 2 * 20;
    const minXPosition = contentWidth - sliderWidth;

    console.log({sliderWidth}, {contentWidth})
    console.log(activeUsers.length)

    const handlers = useSwipeable({
        onSwiping: ({deltaX}) => {
            setStyle(style => {
                const updatedStyle = {...style};
                const translateX = xPosition + deltaX;
                setOffsetX(deltaX);
                updatedStyle.transform = `translateX(${translateX}px)`;
                return updatedStyle;
            });
        },
        onTouchEndOrOnMouseUp: () => {
            let newXPosition = xPosition + offsetX;

            if (newXPosition > 0 || sliderWidth <= contentWidth) {
                newXPosition = 0;

                requestAnimationFrame(() => {
                    setStyle(style => {
                        const updatedStyle = {...style};
                        updatedStyle.transform = `translateX(${newXPosition}px)`;
                        return updatedStyle;
                    });
                });
            } else if (newXPosition < minXPosition) {
                newXPosition = minXPosition;

                requestAnimationFrame(() => {
                    setStyle(style => {
                        const updatedStyle = {...style};
                        updatedStyle.transform = `translateX(${newXPosition}px)`;
                        return updatedStyle;
                    });
                });
            }

            setXPosition(newXPosition);
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
        trackTouch: true
    });

    useEffect(() => {
        getAllUsers()
            .then(users => {
                setActiveUsers(users.filter(user => user.id !== userId));
            });
    }, []);

    return (
        <div className="slider-container">
            <div className="active-users-container" {...handlers} style={style}>
                {activeUsers.map(({id, displayName, iconColour}) => (
                    <div key={id} className="active-user-container">
                        <ActiveUserIcon id={id} size="large" colour={iconColour}/>
                        <p>{displayName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActiveUsersSlider;