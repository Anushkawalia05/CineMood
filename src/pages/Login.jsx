import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

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
                    email: user.email
                })
            );

            navigate("/");
        } else {
            setError("Invalid username or password.");
        }
    };

    return (
        <main className="simple-page">
            <section className="simple-page-content login-content">
                <p className="discover-tagline">Welcome back</p>

                <h1>Login 🎬</h1>

                <form className="feedback-form" onSubmit={handleSubmit}>
                    <label htmlFor="login-username">
                        Username
                    </label>

                    <input
                        id="login-username"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Enter your username"
                        required
                    />

                    <label htmlFor="login-password">
                        Password
                    </label>

                    <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                        required
                    />

                    {error && <p>{error}</p>}

                    <button type="submit">
                        Login
                    </button>
                </form>

                <p>
                    Don't have an account?{" "}
                    <Link to="/signup">
                        Sign Up
                    </Link>
                </p>
            </section>
        </main>
    );
}

export default Login;