export default function LoadingFallback() {
  return (
    <div className="flex items-center justify-center flex-1">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-300"></div>
        <p className="mt-4 text-slate-300">Carregando página...</p>
      </div>
    </div>
  )
}
