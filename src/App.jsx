import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SearchResult from './pages/SearchResult'
import Profile from './pages/Profile'
import OfflineProfiles from './pages/OfflineProfiles'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:username" element={<SearchResult />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/offline-profiles" element={<OfflineProfiles />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
