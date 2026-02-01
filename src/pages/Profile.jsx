import { useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Profile() {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const isOfflineMode = searchParams.get('offline') === 'true';
  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const reposPerPage = 5;
  const [sortBy, setSortBy] = useState('name-asc');

  const fetchProfileFromGitHub = async (username) => {
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    if (!userResponse.ok) {
      throw new Error('Usuário não encontrado');
    }
    const userData = await userResponse.json();

    const reposResponse = await fetch(userData.repos_url);
    if (!reposResponse.ok) {
      throw new Error('Erro ao buscar repositórios');
    }
    const reposData = await reposResponse.json();
    
    const savedProfile = saveProfileToOfflineStorage(userData, reposData);
    setUserData(savedProfile);
    setReposData(savedProfile.repositories);
  };

  const handleRefreshProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      await fetchProfileFromGitHub(username);
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      setError('Erro ao atualizar perfil.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        
        if (isOfflineMode) {
          const savedProfiles = JSON.parse(localStorage.getItem('offlineProfiles') || '[]');
          const savedProfileData = savedProfiles.find(profile => profile.login === username);
          if (savedProfileData?.repositories) {
            setUserData(savedProfileData);
            setReposData(savedProfileData.repositories);
            setLoading(false);
            return;
          } else {
            throw new Error('Perfil não encontrado entre os visualizados');
          }
        }

        await fetchProfileFromGitHub(username);
      } catch (err) {
        console.error('Erro ao buscar perfil:', err);
        setError('Erro ao buscar perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, isOfflineMode]);

  const saveProfileToOfflineStorage = (profileData, repositories) => {
    const savedProfiles = JSON.parse(localStorage.getItem('offlineProfiles') || '[]');
    const existingIndex = savedProfiles.findIndex(profile => profile.login === profileData.login);
    
    const profileToSave = {
      login: profileData.login,
      avatar_url: profileData.avatar_url,
      name: profileData.name,
      bio: profileData.bio,
      followers: profileData.followers,
      following: profileData.following,
      public_repos: profileData.public_repos,
      location: profileData.location,
      viewedAt: new Date().toISOString(),
      repositories
    };
    
    if (existingIndex === -1) {
      savedProfiles.unshift(profileToSave);
    } else {
      savedProfiles[existingIndex] = profileToSave;
    }
    
    localStorage.setItem('offlineProfiles', JSON.stringify(savedProfiles));
    
    return profileToSave;
  };

  const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  const sortedRepos = [...reposData].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'stars-asc':
        return a.stargazers_count - b.stargazers_count;
      case 'stars-desc':
        return b.stargazers_count - a.stargazers_count;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const totalPages = Math.ceil(reposData.length / reposPerPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const startIndex = (page - 1) * reposPerPage;
  const endIndex = startIndex + reposPerPage;
  const paginatedRepos = sortedRepos.slice(startIndex, endIndex);

  return (
    <main className="px-6 py-6">
      <div>
        {loading && (
          <div className="flex justify-center items-center py-12">
            <p className="text-xl text-slate-300">Carregando perfil...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {!error && userData && !loading && (
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 md:items-start items-center">
              <img
                src={userData.avatar_url}
                alt={`Avatar de ${userData.login}`}
                className="w-48 h-48 rounded-full border-4 border-slate-300"
              />
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold mb-2">{userData.name || userData.login}</h1>
                <p className="text-xl text-slate-500 mb-4">@{userData.login}</p>
                
                {isOfflineMode && userData.viewedAt && (
                  <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-md">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-yellow-800">
                      <span>📅 Perfil visto em: {new Date(userData.viewedAt).toLocaleString('pt-BR')}</span>
                      <span className="text-slate-400">•</span>
                      <span 
                        onClick={handleRefreshProfile}
                        className="text-blue-700 hover:text-blue-900 underline cursor-pointer font-medium"
                      >
                        buscar dados mais recentes
                      </span>
                    </div>
                  </div>
                )}
                
                {userData.bio && (
                  <p className="text-xl text-slate-300 mb-6">{userData.bio}</p>
                )}
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-200 p-4 rounded-lg">
                    <p className="text-bold text-slate-600">Seguidores</p>
                    <p className="text-2xl font-bold text-slate-900">{userData.followers}</p>
                  </div>
                  
                  <div className="bg-slate-200 p-4 rounded-lg">
                    <p className="text-bold text-slate-600">Seguindo</p>
                    <p className="text-2xl font-bold text-slate-900">{userData.following}</p>
                  </div>
                  
                  <div className="bg-slate-200 p-4 rounded-lg">
                    <p className="text-bold text-slate-600">Estrelas</p>
                    <p className="text-2xl font-bold text-slate-900">{totalStars}</p>
                  </div>
                  
                  <div className="bg-slate-200 p-4 rounded-lg">
                    <p className="text-bold text-slate-600">Repositórios</p>
                    <p className="text-2xl font-bold text-slate-900">{userData.public_repos}</p>
                  </div>
                </div>
                
                {userData.location && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-slate-600">📍</span>
                    <span>{userData.location}</span>
                  </div>
                )}
              </div>
            </div>

            {reposData.length > 0 && (
              <div className="mt-12">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold">Repositórios ({reposData.length})</h2>
                  
                  <div className="flex items-center justify-center gap-2">
                    <label htmlFor="sort" className="text-sm text-slate-300">
                      Ordenar por:
                    </label>
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={handleSortChange}
                      className="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg border-2"
                    >
                      <option value="name-asc">Nome (A-Z)</option>
                      <option value="name-desc">Nome (Z-A)</option>
                      <option value="stars-asc">Estrelas (menor)</option>
                      <option value="stars-desc">Estrelas (maior)</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  {paginatedRepos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-slate-200 rounded-lg border border-slate-300 hover:bg-slate-300 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{repo.name}</h3>
                        <span className="text-sm bg-slate-300 px-3 py-1 rounded-full text-slate-900">
                          ⭐ {repo.stargazers_count}
                        </span>
                      </div>
                      {repo.description && (
                        <p className="text-slate-600 mb-2">{repo.description}</p>
                      )}
                      <div className="flex gap-4 text-sm text-slate-600">
                        {repo.language && (
                          <span>📝 {repo.language}</span>
                        )}
                        <span>🍴 {repo.forks_count}</span>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="flex justify-center items-center gap-3 mt-8">
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
        )}
      </div>
    </main>
  );
}
