import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="not-found-page">
            <h1>404</h1>
            <h2>Movie not found 🎬</h2>
            <p>The page you're looking for doesn't exist.</p>

            <button
                type="button"
                onClick={() => navigate("/")}
            >
                Back to Home
            </button>
        </main>
    );
}

export default NotFound;