import { FiGithub } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="w-screen shadow-md z-50">
      <nav className="px-6 pt-6 pb-4 flex items-center justify-center">
        <Link
          to="/"
          className="flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label="Go to home"
        >
          <FiGithub size={48} className="text-slate-200" />
        </Link>
      </nav>
    </header>
  )
}
