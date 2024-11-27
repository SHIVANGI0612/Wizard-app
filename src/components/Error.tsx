import { useAppContext } from "../providers/FiltersContext";
import "../styles/Error.scss";

const Error = ({ message }: { message: string }) => {
  return (
    <div className="error-container">
      <div className="error-message">
        <p>{message}</p>
      </div>
      <button className="retry-btn" onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );
};
export default Error;
