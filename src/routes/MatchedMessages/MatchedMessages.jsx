import "./MatchedMessages.css";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectMessageResults} from "../../features/search/searchSlice";
import {useEffect, useState} from "react";
import MessagePreview from "../../common/components/MessagePreview/MessagePreview";

const MatchedMessages = () => {

    const {chatId} = useParams();

    const navigate = useNavigate();

    const messageResults = useSelector(selectMessageResults);

    const [details, setDetails] = useState({});

    useEffect(() => {
        if (!messageResults || !chatId) return;

        const result = messageResults.find(result => result.id === chatId);
        const {id, otherUserDetails, matchedMessages} = result;
        const {id: otherUserId, displayName, iconColour} = otherUserDetails;

        setDetails({
            id,
            otherUserId,
            displayName,
            iconColour,
            matchedMessages
        });
    }, [chatId, messageResults]);

    const handleBackClick = () => {
        navigate("/");
    };

    const {id, otherUserId, displayName, iconColour, matchedMessages} = details;

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

            {matchedMessages && matchedMessages.map((message, i) => (
                <MessagePreview
                    key={id + i}
                    id={id}
                    otherUserId={otherUserId}
                    name={displayName}
                    iconColour={iconColour}
                    content={message.content}
                />
            ))}
        </div>
    );
};

export default MatchedMessages;