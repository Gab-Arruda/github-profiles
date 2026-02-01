import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingFallback from './components/LoadingFallback'

const Home = lazy(() => import('./pages/Home'))
const SearchResult = lazy(() => import('./pages/SearchResult'))
const Profile = lazy(() => import('./pages/Profile'))
const OfflineProfiles = lazy(() => import('./pages/OfflineProfiles'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:username" element={<SearchResult />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/offline-profiles" element={<OfflineProfiles />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
