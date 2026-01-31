import SearchBar from '../components/SearchBar'

export default function Home() {
  return (
    <main className="px-6 py-6">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">GitHub Profiles</h1>
        <SearchBar />
      </div>
    </main>
  );
}
