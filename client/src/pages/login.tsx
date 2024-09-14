import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email: emailRef?.current?.value,
          password: passwordRef?.current?.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //set token in local storage
      console.log("API called");
      if (response.status)
        localStorage.setItem("auth-token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log("login failed", err);
      //@ts-ignore
      setError("Invalid Credentials!");
    }
  };

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  return (
    <div className="login-form">
      {error && <span className="error">{error}</span>}
      <form onSubmit={handleSubmit}>
        <section>
          <label>Email</label>
          <input
            ref={emailRef}
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </section>

        <section>
          <label>Password</label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </section>

        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
