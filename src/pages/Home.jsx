import SearchBar from '../components/SearchBar'

export default function Home() {
  return (
    <main className="px-6 flex items-center justify-center flex-1">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-slate-200 font-medium ml-2">GitHub Profiles</h1>
        <span className="text-xl mb-16">Procure perfis do GitHub.</span>
        <SearchBar />
      </div>
    </main>
  );
}
