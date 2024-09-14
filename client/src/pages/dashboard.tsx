import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("auth-token");

const Dashboard: React.FC = (): JSX.Element => {
  const [protectedData, setProtectedData] = useState("");
  const navigate = useNavigate();

  const fetchProtectedData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProtectedData(response.data.message);
    } catch (error) {
      console.error("Failed to fetch protected data:", error);
    }
  };

  return (
    <>
      {token ? (
        <div>
          <h3>Login Done !</h3>
          <button onClick={fetchProtectedData}> Fetch Protected info</button>
          {protectedData && <p className="protected">{protectedData}</p>}
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
