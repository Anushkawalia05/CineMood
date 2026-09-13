import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Discover from './pages/Discover'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import NotFound from './pages/NotFound'
import About from './pages/About'
import Feedback from './pages/Feedback'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Signup from './pages/SignUp'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Discover />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
          </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App