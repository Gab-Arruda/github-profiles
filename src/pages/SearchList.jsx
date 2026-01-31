import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Search() {
  const { username } = useParams()
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      setError(null)
      try {
        const page = 1
        const itemsPerPage = 30
        const response = await fetch(
          `https://api.github.com/search/users?q=${encodeURIComponent(username)}&page=${page}&per_page=${itemsPerPage}`
        )
        
        if (!response.ok) {
          throw new Error('Erro na busca')
        }
        
        const data = await response.json()
        setResults(data)
      } catch (err) {
        console.error('Erro ao buscar usuários:', err)
        setError('Erro ao buscar usuários. Tente novamente.')
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [username])

  return (
    <main className="px-6 py-6">
      <div>
        <h1 className="text-3xl font-bold mb-6">Resultados para: {username}</h1>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <p className="text-xl text-slate-600">Buscando...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {results && !loading && (
          <div className="space-y-4">
            <p className="text-slate-600">
              {results.total_count} resultados encontrados
            </p>
            {/* TODO: Exibir os resultados aqui */}
          </div>
        )}
      </div>
    </main>
  );
}
