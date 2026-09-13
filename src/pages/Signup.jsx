import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            username: username.trim(),
            email: email.trim(),
            password: password
        };

        localStorage.setItem("cinemoodUser", JSON.stringify(user));

        navigate("/login");
    };

    return (
        <main className="simple-page">
            <section className="simple-page-content login-content">
                <p className="discover-tagline">Join CineMood</p>

                <h1>Create Account 🎬</h1>

                <form className="feedback-form" onSubmit={handleSubmit}>
                    <label htmlFor="signup-username">
                        Username
                    </label>

                    <input
                        id="signup-username"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Enter your username"
                        required
                    />

                    <label htmlFor="signup-email">
                        Email
                    </label>

                    <input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email"
                        required
                    />

                    <label htmlFor="signup-password">
                        Password
                    </label>

                    <input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Create a password"
                        required
                    />

                    <button type="submit">
                        Sign Up
                    </button>
                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>
            </section>
        </main>
    );
}

export default Signup;