import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import "../styles/home.css";

function Home() {
    const navigate = useNavigate();

    const handleSearch = (query) => {
        if (query) {
            navigate(`/movies?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <main className="home-page">
            <section className="home-hero">
                <p className="home-tagline">Your mood. Your movies.</p>

                <h1>Welcome to CineMood 🎬</h1>

                <p className="home-description">
                    Find the perfect movie for whatever you're feeling today.
                </p>

                <SearchBar onSearch={handleSearch} />

                <button
                    type="button"
                    className="home-discover-button"
                    onClick={() => navigate("/movies")}
                >
                    Discover Movies
                </button>
            </section>
        </main>
    );
}

export default Home;