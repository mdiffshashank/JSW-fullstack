import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    //remove from localstorage
    localStorage.clear();
    navigate("/login");
  };
  return <button onClick={onLogout}>Logout</button>;
};

export default Logout;
