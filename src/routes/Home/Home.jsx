import './Home.css';
import SearchBar from "../../common/components/SearchBar/SearchBar";
import UserIcon from "../../common/components/UserIcon/UserIcon";

const users = new Array(8).fill(0);

const Home = () => {
    return (
        <div className="home-container">
            <SearchBar/>

            <div className="active-users-container">
                {users.map((_, i) => (
                    <UserIcon key={i}/>
                ))}
            </div>
        </div>
    );
}

export default Home;
