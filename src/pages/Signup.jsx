import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Icon from "../components/Icon";
import "../styles/auth.css";

function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const password = String(fields.get("password"));
    if (password !== fields.get("confirmPassword")) {
      setError("Those passwords do not match yet.");
      return;
    }
    setSubmitting(true);
    setError("");
    const message = await signUp({ name: fields.get("name"), email: fields.get("email"), password });
    setSubmitting(false);
    if (message) setError(message);
    else navigate("/movies");
  }

  return (
    <main className="auth-page">
      <aside className="auth-story">
        <Link className="auth-brand" to="/"><Icon name="film" size={20} /> Cine<span>Mood</span></Link>
        <p className="home-section-kicker">A better kind of movie night</p>
        <h1>Keep the stories that feel like <em>you.</em></h1>
        <p>Save favorites, build a watch-later shelf, and let your mood lead the way.</p>
        <div className="auth-orbit" aria-hidden="true"><Icon name="heart" size={25} /><i><Icon name="sparkle" size={15} /></i><b><Icon name="sparkle" size={15} /></b></div>
      </aside>
      <section className="auth-card" aria-labelledby="signup-heading">
        <p className="auth-eyebrow">Your movie corner</p>
        <h2 id="signup-heading">Create your account</h2>
        <p className="auth-subtitle">It takes a minute. Your next favorite is waiting.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="signup-name">Your name</label>
          <input id="signup-name" name="name" type="text" autoComplete="name" placeholder="Anushka" minLength="2" maxLength="60" required />
          <label htmlFor="signup-email">Email address</label>
          <input id="signup-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          <label htmlFor="signup-password">Password</label>
          <input id="signup-password" name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" minLength="8" required />
          <label htmlFor="signup-confirm">Confirm password</label>
          <input id="signup-confirm" name="confirmPassword" type="password" autoComplete="new-password" placeholder="Type it once more" minLength="8" required />
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="auth-submit" type="submit" disabled={submitting}>{submitting ? "Creating your account…" : "Create account"}<span aria-hidden="true">→</span></button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        <p className="auth-demo-note">Class project demo: accounts are saved in this browser only. Do not use a real password.</p>
      </section>
    </main>
  );
}

export default SignUp;
