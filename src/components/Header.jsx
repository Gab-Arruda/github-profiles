import { FiGithub } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="w-full shadow-md z-50 backdrop-blur-xs">
      <nav className="px-6 pt-6 pb-4 flex items-center justify-around">
        <Link
          to="/"
          className="flex items-center justify-center hover:opacity-70 transition-opacity"
          aria-label="Go to home"
        >
          <FiGithub size={32} className="text-slate-200" />
        </Link>
      </nav>
    </header>
  )
}
