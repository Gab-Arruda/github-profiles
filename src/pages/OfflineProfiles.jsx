import { useState } from 'react'
import ProfileList from '../components/ProfileList'

export default function OfflineProfiles() {
  const profiles = JSON.parse(localStorage.getItem('offlineProfiles') || '[]')
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1)
    window.scrollTo(0, 0)
  }

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(1, prevPage - 1))
    window.scrollTo(0, 0)
  }

  const totalPages = Math.ceil(profiles.length / itemsPerPage)
  const hasNextPage = page < totalPages
  const hasPreviousPage = page > 1

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProfiles = profiles.slice(startIndex, endIndex)

  return (
    <main className="px-6 py-6">
      <div>
        <h3 className="text-3xl font-bold mb-6">Perfis Visitados</h3>
        
        {profiles.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-xl text-slate-300">Nenhum perfil visitado ainda</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-slate-300">
              {profiles.length} {profiles.length === 1 ? 'perfil visitado' : 'perfis visitados'}
            </p>
            <ProfileList items={paginatedProfiles} isOffline={true} />
            
            {totalPages > 1 && (
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
            )}
          </div>
        )}
      </div>
    </main>
  );
}
