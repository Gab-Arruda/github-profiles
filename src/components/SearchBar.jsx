import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const validateUsername = (name) => {
    if (!name.trim()) return "O campo não pode estar vazio."
    if (name.length > 39) return "Máximo de 39 caracteres."
    
    // Permite alfanumérico e hifens únicos, não pode iniciar/terminar com hífen
    const githubRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i
    if (!githubRegex.test(name)) {
      return "Verifique hifens ou caracteres especiais."
    }
    
    return ""
  }

  const handleSearch = (e) => {
    e.preventDefault()
    
    const validationError = validateUsername(username)
    
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    navigate(`/search/${username}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Digite um username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:border-transparent! focus:outline-none focus:ring-2"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-slate-200! text-slate-900 rounded-lg border-2! border-transparent! hover:opacity-70 transition-opacity font-medium"
        >
          Pesquisar
        </button>
      </div>
      
      {error && (
        <span 
          id="search-error" 
          role="alert" 
          className="text-red-400 text-sm mt-2 block font-medium"
        >
          {error}
        </span>
      )}
    </form>
  )
}
