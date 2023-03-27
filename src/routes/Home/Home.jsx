import './Home.css';
import SearchBar from "../../common/components/SearchBar/SearchBar";
import ActiveUserIcon from "../../common/components/ActiveUserIcon/ActiveUserIcon";

const users = new Array(8).fill(0);

const Home = () => {
    return (
        <div className="home-container">
            <SearchBar/>

            <div className="active-users-container">
                {users.map((_, i) => (
                    <ActiveUserIcon key={i}/>
                ))}
            </div>
        </div>
    );
}

export default Home;
