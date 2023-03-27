import './Home.css';
import SearchBar from "../../common/components/SearchBar/SearchBar";
import ActiveUserIcon from "../../common/components/ActiveUserIcon/ActiveUserIcon";
import MessagePreview from "../../common/components/MessagePreview/MessagePreview";
import {useSwipeable} from "react-swipeable";
import {useEffect, useMemo, useState} from "react";

const users = new Array(12).fill(0);
const userId = 1;

const message1 = {
    id: 100,
    fromId: 1,
    toId: 2,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
    pariatur.`
};

const messages = new Array(8).fill(0);

const Home = () => {

    const [style, setStyle] = useState({transform: `translateX(0px)`});
    const [xPosition, setXPosition] = useState(0);
    const [offsetX, setOffsetX] = useState(0);

    const minXPosition = useMemo(() => {
        const paddingRight = 12;
        const contentWidth = (window.innerWidth > 500 ? 500 : window.innerWidth) - 2 * paddingRight;
        const sliderWidth = (45 * users.length) + (1.25 * 16 * (users.length - 1));
        return contentWidth - sliderWidth;
    }, []);

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

                setStyle(style => {
                    const updatedStyle = {...style};
                    updatedStyle.transform = `translateX(${newXPosition}px)`;
                    return updatedStyle;
                });
            } else if (newXPosition < minXPosition) {
                newXPosition = minXPosition;

                setStyle(style => {
                    const updatedStyle = {...style};
                    updatedStyle.transform = `translateX(${newXPosition}px)`;
                    return updatedStyle;
                });
            }

            setXPosition(newXPosition);
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
        trackTouch: true
    });

    return (
        <div className="home-container container">
            <h1>Chats</h1>

            <div className="search-bar-container">
                <SearchBar/>
            </div>

            <div className="slider-container">
                <div className="active-users-container" {...handlers} style={style}>
                    {users.map((_, i) => (
                        <div key={i} className="active-user-container">
                            <ActiveUserIcon/>
                            <p>Ryan Henzell-Hill</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="message-previews-container">
                {messages.map((_, i) => (
                    <MessagePreview
                        key={message1.id * (i + 1)}
                        content={message1.content}
                        name="Fran Nicholson"
                        fromUser={userId === message1.fromId}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
