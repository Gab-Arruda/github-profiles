import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProfileList from '../components/ProfileList'
import OfflineModal from '../components/OfflineModal'

export default function Search() {
  const { username } = useParams()
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [isOffline, setIsOffline] = useState(false)
  const itemsPerPage = 5

  useEffect(() => {
    const fetchResults = async () => {
      if (!window.navigator.onLine) {
        setIsOffline(true);
        return;
      }
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${encodeURIComponent(username)}&page=${page}&per_page=${itemsPerPage}`
        )
        
        if (!response.ok) {
          throw new Error('Erro na busca')
        }
        
        const data = await response.json()
        setResults(data)
        setIsOffline(false);
      } catch (err) {
        if (!window.navigator.onLine || err.name === 'TypeError') {
          setIsOffline(true);
        } else {
          setError('Erro ao buscar usuários. Tente novamente.');
        }
        console.error(err);
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [username, page])

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1)
    window.scrollTo(0, 0)
  }

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(1, prevPage - 1))
    window.scrollTo(0, 0)
  }

  const hasNextPage = results && page * itemsPerPage < results.total_count
  const hasPreviousPage = page > 1
  const totalPages = results ? Math.ceil(results.total_count / itemsPerPage) : 0

  return (
    <main className="px-6 py-6">
      <OfflineModal isOpen={isOffline} onClose={() => setIsOffline(false)} />
      <div>
        <h3 className="text-3xl font-bold mb-6">Resultados para: {username}</h3>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <p className="text-xl text-slate-300">Buscando...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {results && !loading && (
          <div className="space-y-4">
            <p className="text-slate-300">
              {results.total_count} resultados encontrados
            </p>
            <ProfileList items={results.items} />
            
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handlePreviousPage}
                disabled={!hasPreviousPage}
                className="px-6 py-2 bg-slate-200! text-slate-900 rounded-lg border-2! border-transparent! disabled:opacity-50 disabled:cursor-not-allowed! hover:opacity-70 transition-opacity font-medium"
              >
                Anterior
              </button>
              
              <span className="text-slate-600 font-medium">
                Página {page} de {totalPages}
              </span>
              
              <button
                onClick={handleNextPage}
                disabled={!hasNextPage}
                className="px-6 py-2 bg-slate-200! text-slate-900 rounded-lg border-2! border-transparent! disabled:opacity-50 disabled:cursor-not-allowed! hover:opacity-70 transition-opacity font-medium"
              >
                Próxima
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
