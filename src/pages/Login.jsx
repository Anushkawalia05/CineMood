import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import loginBackground from "../assets/login-bg.png";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const savedUser = localStorage.getItem("cinemoodUser");

    if (!savedUser) {
      setError("No account found. Please sign up first.");
      return;
    }

    const user = JSON.parse(savedUser);

    if (
      username.trim() === user.username &&
      password === user.password
    ) {
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          username: user.username,
          email: user.email,
        })
      );

      navigate("/");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <main className="login-page">

      {/* Background Image */}
      <img
        src={loginBackground}
        alt=""
        className="login-background-image"
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div className="login-background-overlay"></div>

      {/* Red cinematic glow */}
      <div className="login-background-glow"></div>

      {/* Login Card */}
      <section className="login-card">
        <div className="login-card-header">

          <div className="login-welcome-line">
            <span></span>
            <p>WELCOME BACK</p>
            <span></span>
          </div>

          <h1>
            Login <span>🎬</span>
          </h1>

          <p className="login-subtitle">
            Step back into your cinematic world.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="login-field">
            <label htmlFor="login-username">
              <span className="field-icon">◉</span>
              Username
            </label>

            <input
              id="login-username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">
              <span className="field-icon">🔒</span>
              Password
            </label>

            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-submit-button"
          >
            <span>Login</span>
            <span className="login-arrow">→</span>
          </button>
        </form>

        <div className="login-divider">
          <span></span>
          <p>🎟️</p>
          <span></span>
        </div>

        <p className="login-signup-text">
          Don't have an account?{" "}
          <Link to="/signup">Create one</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;