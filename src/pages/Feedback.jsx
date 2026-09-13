import { useState } from "react";

function Feedback() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="simple-page">
            <section className="simple-page-content feedback-content">
                <p className="discover-tagline">We'd love to hear from you</p>

                <h1>Share Your Feedback 💬</h1>

                {submitted ? (
                    <div className="feedback-success">
                        <h2>Thank you! ❤️</h2>
                        <p>Your feedback has been received.</p>
                    </div>
                ) : (
                    <form className="feedback-form" onSubmit={handleSubmit}>
                        <label htmlFor="feedback-name">
                            Name
                        </label>

                        <input
                            id="feedback-name"
                            type="text"
                            placeholder="Your name"
                            required
                        />

                        <label htmlFor="feedback-email">
                            Email
                        </label>

                        <input
                            id="feedback-email"
                            type="email"
                            placeholder="Your email"
                            required
                        />

                        <label htmlFor="feedback-message">
                            Feedback
                        </label>

                        <textarea
                            id="feedback-message"
                            placeholder="Tell us what you think..."
                            rows="5"
                            required
                        />

                        <button type="submit">
                            Submit Feedback
                        </button>
                    </form>
                )}
            </section>
        </main>
    );
}

export default Feedback;