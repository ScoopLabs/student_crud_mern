import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/" className="backBtn">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
