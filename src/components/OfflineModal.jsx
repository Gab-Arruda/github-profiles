import { Link } from 'react-router-dom'

export default function OfflineModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full shadow-xl border border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-slate-200">Sem Conexão com a Internet</h2>
        <p className="text-slate-300 mb-6">
          Não foi possível conectar à API do GitHub. Verifique sua conexão com a internet ou visite os últimos perfis visualizados.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Link
            to="/offline-profiles"
            className="px-6 py-2 bg-slate-200! text-slate-900! rounded-lg border-2! border-transparent! hover:opacity-70! transition-opacity font-medium"
            onClick={onClose}
          >
            Ver Perfis Visualizados
          </Link>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg border-2! border-transparent! hover:bg-slate-600! transition-colors font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
