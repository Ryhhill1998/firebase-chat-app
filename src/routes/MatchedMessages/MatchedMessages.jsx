import "./MatchedMessages.css";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectMessageResults} from "../../features/search/searchSlice";
import {useEffect, useState} from "react";

const MatchedMessages = () => {

    const {chatId} = useParams();

    const navigate = useNavigate();

    const messageResults = useSelector(selectMessageResults);

    const [messages, setMessages] = useState();

    useEffect(() => {
        if (!messageResults || !chatId) return;

        setMessages(messageResults.find(result => result.id === chatId));
    }, [chatId, messageResults]);

    useEffect(() => {
        console.log(messages)
    }, [messages]);

    const handleBackClick = () => {
        navigate("/");
    };

    return (
        <div className="matched-messages-container container">
            <header>
                <button onClick={handleBackClick}>
                    <FontAwesomeIcon className="icon" icon={faChevronLeft}/>
                </button>

                <h1>Name</h1>

                <button style={{visibility: "hidden"}}>
                    <FontAwesomeIcon className="icon" icon={faChevronLeft}/>
                </button>
            </header>
        </div>
    );
};

export default MatchedMessages;