import "./MatchedMessages.css";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    focusOutSearch,
    resetMessageResults,
    resetSearchQuery,
    selectMessageResults
} from "../../features/search/searchSlice";
import {useEffect, useState} from "react";
import MessagePreview from "../../common/components/MessagePreview/MessagePreview";
import {selectDisplayName, selectIconColour, selectUserId} from "../../features/user/userSlice";

const MatchedMessages = () => {

    const {chatId} = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const userDisplayName = useSelector(selectDisplayName);
    const userIconColour = useSelector(selectIconColour);
    const messageResults = useSelector(selectMessageResults);

    const [details, setDetails] = useState({});

    useEffect(() => {
        if (!messageResults || !chatId) return;

        const result = messageResults.find(result => result.id === chatId);
        const {id, otherUserDetails, matchedMessages} = result;
        const {displayName, iconColour} = otherUserDetails;

        setDetails({
            id,
            displayName,
            iconColour,
            matchedMessages
        });
    }, [chatId, messageResults]);

    const handleBackClick = () => {
        dispatch(focusOutSearch());
        dispatch(resetMessageResults());
        dispatch(resetSearchQuery());
        navigate("/");
    };

    const {id, displayName, iconColour, matchedMessages} = details;

    return (
        <div className="matched-messages-container container">
            <header>
                <button onClick={handleBackClick}>
                    <FontAwesomeIcon className="icon" icon={faChevronLeft}/>
                </button>

                {displayName && <h1>{displayName}</h1>}

                <button style={{visibility: "hidden"}}>
                    <FontAwesomeIcon className="icon" icon={faChevronLeft}/>
                </button>
            </header>

            <div className="messages-container">
                {matchedMessages && matchedMessages.map((message, i) => {
                    const fromUser = message.fromUserId === userId;

                    return (
                        <MessagePreview
                            key={id + i}
                            id={id}
                            name={fromUser ? userDisplayName : displayName}
                            iconColour={fromUser ? userIconColour : iconColour}
                            content={message.content}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default MatchedMessages;