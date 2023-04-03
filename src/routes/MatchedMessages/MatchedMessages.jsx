import "./MatchedMessages.css";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    focusOutSearch,
    resetMessageResults,
    resetSearchQuery,
    selectMessageResults, selectSearchQuery, setSelectedMessageId
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
    const searchQuery = useSelector(selectSearchQuery);

    const [details, setDetails] = useState({});

    useEffect(() => {
        if (!messageResults) {
            handleBackClick();
        }
    }, [messageResults]);

    useEffect(() => {
        if (!messageResults || !chatId) return;

        const result = messageResults.find(result => result.id === chatId);
        const {id, otherUserDetails, messages, matchedMessages} = result;
        const {displayName, iconColour} = otherUserDetails;

        setDetails({
            id,
            displayName,
            iconColour,
            messages,
            matchedMessages
        });
    }, [chatId, messageResults]);

    const handleBackClick = () => {
        dispatch(focusOutSearch());
        dispatch(resetMessageResults());
        dispatch(resetSearchQuery());
        navigate("/");
    };

    const {id, displayName, iconColour, messages, matchedMessages} = details;

    const handlePreviewClick = (index) => {
        dispatch(setSelectedMessageId(index));
    };

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
                    const index = messages.indexOf(message);

                    return (
                        <MessagePreview
                            key={id + i}
                            id={id}
                            name={fromUser ? userDisplayName : displayName}
                            iconColour={fromUser ? userIconColour : iconColour}
                            content={message.content}
                            searchString={searchQuery}
                            handlePreviewClick={handlePreviewClick}
                            index={index}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default MatchedMessages;