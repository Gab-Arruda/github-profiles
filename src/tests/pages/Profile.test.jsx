import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Profile from '../../pages/Profile'

global.fetch = vi.fn()

describe('Profile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: true,
    })
  })

  const mockUserData = {
    login: 'testuser',
    name: 'User Teste',
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    bio: 'Bio Teste',
    followers: 100,
    following: 50,
    public_repos: 10,
    location: 'Cidade Teste',
    repos_url: 'https://api.github.com/users/testuser/repos',
  }

  const mockReposData = [
    {
      id: 1,
      name: 'repo1',
      html_url: 'https://github.com/testuser/repo1',
      description: 'Test repo 1',
      stargazers_count: 10,
      forks_count: 5,
      language: 'JavaScript',
    },
    {
      id: 2,
      name: 'repo2',
      html_url: 'https://github.com/testuser/repo2',
      description: 'Test repo 2',
      stargazers_count: 20,
      forks_count: 8,
      language: 'Python',
    },
  ]

  const renderWithRouter = (username = 'testuser') => {
    return render(
      <MemoryRouter initialEntries={[`/profile/${username}`]}>
        <Routes>
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </MemoryRouter>
    )
  }

  it('deve renderizar estado de carregamento inicialmente', () => {
    fetch.mockImplementation(() => new Promise(() => {}))

    renderWithRouter()

    expect(screen.getByText('Carregando perfil...')).toBeInTheDocument()
  })

  it('deve exibir dados do perfil do usuário', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserData,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockReposData,
      })

    renderWithRouter()

    await waitFor(() => {
      expect(screen.getByText('User Teste')).toBeInTheDocument()
    })

    expect(screen.getByText('@testuser')).toBeInTheDocument()
    expect(screen.getByText('Bio Teste')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('Cidade Teste')).toBeInTheDocument()
  })

  it('deve exibir mensagem de erro quando usuário não é encontrado', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    })

    renderWithRouter()

    await waitFor(() => {
      expect(screen.getByText('Erro ao buscar perfil')).toBeInTheDocument()
    })
  })

  it('deve exibir repositórios do usuário', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserData,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockReposData,
      })

    renderWithRouter()

    await waitFor(() => {
      expect(screen.getByText('Repositórios (2)')).toBeInTheDocument()
    })

    expect(screen.getByText('repo1')).toBeInTheDocument()
    expect(screen.getByText('repo2')).toBeInTheDocument()
    expect(screen.getByText('Test repo 1')).toBeInTheDocument()
  })

  it('deve exibir modal offline quando o usuário estiver offline', async () => {
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: false,
    })

    renderWithRouter()

    await waitFor(() => {
      expect(screen.getByText('Sem Conexão com a Internet')).toBeInTheDocument()
    })
  })
})
