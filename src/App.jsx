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
import Signup from './pages/SignUp'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Movies / Discover */}
        <Route path="/movies" element={<Discover />} />
        <Route path="/discover" element={<Discover />} />

        {/* Movie Details */}
        <Route path="/movie/:id" element={<MovieDetails />} />

        {/* Favorites */}
        <Route path="/favorites" element={<Favorites />} />

        {/* Other Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
