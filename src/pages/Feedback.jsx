import { useState } from "react";
import { getData, saveData } from "../utils/storage";
import "../styles/home.css";

function Feedback() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const feedback = getData("feedback", []);
    const saved = saveData("feedback", [
      ...(Array.isArray(feedback) ? feedback : []),
      { message: formData.get("message"), submittedAt: new Date().toISOString() }
    ]);
    if (!saved) return;
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <main className="simple-page">
      <section className="simple-page-content feedback-content">
        <p className="discover-tagline">Help us improve</p>
        <h1>Send feedback</h1>
        {submitted ? (
          <p className="feedback-success" role="status">Thanks for sharing your feedback.</p>
        ) : (
          <form className="feedback-form" onSubmit={handleSubmit}>
            <label htmlFor="feedback-message">Your feedback</label>
            <textarea id="feedback-message" name="message" rows="5" required />
            <button type="submit">Send feedback</button>
          </form>
        )}
      </section>
    </main>
  );
}

export default Feedback;
