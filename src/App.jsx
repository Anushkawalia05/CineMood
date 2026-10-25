import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Discover from "./pages/Discover";
import Favorites from "./pages/Favorites";
import Feedback from "./pages/Feedback";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import MoodMatch from "./pages/MoodMatch";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Discover />} />
        <Route path="/mood-match" element={<MoodMatch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/discover" element={<Navigate to="/movies" replace />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
