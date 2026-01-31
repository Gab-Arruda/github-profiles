import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import SearchList from './pages/SearchList'
import Profile from './pages/Profile'
import OfflineProfiles from './pages/OfflineProfiles'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:username" element={<SearchList />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/offline-profiles" element={<OfflineProfiles />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
