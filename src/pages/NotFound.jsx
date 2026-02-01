import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-bold text-slate-300">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-slate-300">
        Página não encontrada
      </h2>
      <p className="mt-4 text-lg text-slate-300">
        Desculpe, a página que você está procurando não existe.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-slate-300 px-6 py-3 text-slate-700! hover:opacity-70 transition-opacity"
      >
        Voltar para a página inicial
      </Link>
    </div>
  )
}
