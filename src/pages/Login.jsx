import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Icon from "../components/Icon";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    setSubmitting(true);
    setError("");
    const message = await signIn({ email: fields.get("email"), password: fields.get("password") });
    setSubmitting(false);
    if (message) setError(message);
    else navigate("/movies");
  }

  return (
    <main className="auth-page">
      <aside className="auth-story">
        <Link className="auth-brand" to="/"><Icon name="film" size={20} /> Cine<span>Mood</span></Link>
        <p className="home-section-kicker">Welcome back to your story</p>
        <h1>Your next movie night starts <em>here.</em></h1>
        <p>Pick up where your watchlist left off and find a film for the feeling you’re in.</p>
        <div className="auth-orbit" aria-hidden="true"><Icon name="sparkle" size={30} /><i><Icon name="moon" size={15} /></i><b><Icon name="heart" size={15} /></b></div>
      </aside>
      <section className="auth-card" aria-labelledby="login-heading">
        <p className="auth-eyebrow">Your movie corner</p>
        <h2 id="login-heading">Sign in</h2>
        <p className="auth-subtitle">Good to see you again.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email address</label>
          <input id="login-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          <label htmlFor="login-password">Password</label>
          <input id="login-password" name="password" type="password" autoComplete="current-password" placeholder="Your password" required />
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="auth-submit" type="submit" disabled={submitting}>{submitting ? "Signing in…" : "Sign in"}<span aria-hidden="true">→</span></button>
        </form>
        <p className="auth-switch">New to CineMood? <Link to="/signup">Create an account</Link></p>
        <p className="auth-demo-note">Class project demo: sign-in works only in the browser where you created the account. Do not use a real password.</p>
      </section>
    </main>
  );
}

export default Login;
