import './Home.css';
import SearchBar from "../../common/components/SearchBar/SearchBar";
import ActiveUserIcon from "../../common/components/ActiveUserIcon/ActiveUserIcon";
import MessagePreview from "../../common/components/MessagePreview/MessagePreview";

const users = new Array(8).fill(0);
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
    return (
        <div className="home-container container">
            <div className="search-bar-container">
                <SearchBar/>
            </div>

            <div className="active-users-container">
                {users.map((_, i) => (
                    <div key={i} className="active-user-container">
                        <ActiveUserIcon/>
                        <p>Ryan Henzell-Hill</p>
                    </div>
                ))}
            </div>

            {messages.map((_, i) => (
                <MessagePreview
                    key={message1.id * (i + 1)}
                    content={message1.content}
                    name="Fran Nicholson"
                    fromUser={userId === message1.fromId}
                />
            ))}
        </div>
    );
}

export default Home;
