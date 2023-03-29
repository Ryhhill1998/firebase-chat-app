import "./ActiveUsersSlider.css";
import ActiveUserIcon from "../ActiveUserIcon/ActiveUserIcon";
import {useState} from "react";
import {useSwipeable} from "react-swipeable";

const users = new Array(12).fill(0);

const ActiveUsersSlider = ({handleClick}) => {

    const [style, setStyle] = useState({transform: `translateX(0px)`});
    const [xPosition, setXPosition] = useState(0);
    const [offsetX, setOffsetX] = useState(0);

    const sliderWidth = (60 * users.length) + (1.25 * 16 * (users.length - 1));
    const contentWidth = (window.innerWidth > 500 ? 500 : window.innerWidth) - 2 * 20;
    const minXPosition = contentWidth - sliderWidth;

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

            if (newXPosition > 0) {
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

    return (
        <div className="slider-container">
            <div className="active-users-container" {...handlers} style={style}>
                {users.map((_, i) => (
                    <div key={i} className="active-user-container">
                        <ActiveUserIcon size="large" handleClick={handleClick}/>
                        <p>Ryan Henzell-Hill</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActiveUsersSlider;