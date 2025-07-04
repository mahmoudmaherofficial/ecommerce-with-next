import "./NotFound.css";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="background-pattern"></div>
      <div className="content">
        <h1 className="error-code">404</h1>
        <p className="error-message">Page Not Found</p>
        <Link href="/" className="back-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
