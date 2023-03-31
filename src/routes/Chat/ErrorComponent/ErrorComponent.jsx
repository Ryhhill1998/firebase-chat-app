import "./ErrorComponent.css";
import {Link, useRouteError} from "react-router-dom";

const ErrorComponent = () => {

    const error = useRouteError();

    return (
        <div className="error-component">
            <h2>Something went wrong!</h2>
            <p>{error.message}</p>
            <Link to="/">Home</Link>
        </div>
    );
};

export default ErrorComponent;