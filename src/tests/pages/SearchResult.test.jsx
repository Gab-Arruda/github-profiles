import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SearchResult from '../../pages/SearchResult'

global.fetch = vi.fn()

describe('SearchResult', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: true,
    })
  })

  const mockSearchResponse = {
    total_count: 23,
    items: [
      {
        login: 'testuser1',
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      },
      {
        login: 'testuser2',
        avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
      },
      {
        login: 'testuser3',
        avatar_url: 'https://avatars.githubusercontent.com/u/3?v=4',
      },
    ],
  }

  const renderWithRouter = (username = 'test') => {
    return render(
      <MemoryRouter initialEntries={[`/search/${username}`]}>
        <Routes>
          <Route path="/search/:username" element={<SearchResult />} />
        </Routes>
      </MemoryRouter>
    )
  }

  it('deve inicialmente renderizar o estado de carregamento', () => {
    fetch.mockImplementation(() => new Promise(() => {}))

    renderWithRouter()

    expect(screen.getByText('Buscando perfis...')).toBeInTheDocument()
  })

  it('deve exibir os resultados da busca para o username', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResponse,
    })

    renderWithRouter('testuser')

    await waitFor(() => {
      expect(screen.getByText('Resultados para: testuser')).toBeInTheDocument()
    })

    expect(screen.getByText('23 resultados encontrados')).toBeInTheDocument()
    expect(screen.getByText('testuser1')).toBeInTheDocument()
    expect(screen.getByText('testuser2')).toBeInTheDocument()
    expect(screen.getByText('testuser3')).toBeInTheDocument()
  })

  it('deve exibir mensagem de erro quando a requisição da API falhar', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'))
    
    renderWithRouter()

    await waitFor(() => {
      expect(
        screen.getByText('Erro ao buscar usuários. Tente novamente.')
      ).toBeInTheDocument()
    })
  })

  it('deve exibir o modal offline quando o usuário estiver offline', async () => {
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: false,
    })

    renderWithRouter()

    await waitFor(() => {
      expect(screen.getByText('Sem Conexão com a Internet')).toBeInTheDocument()
    })
  })

  it('deve exibir os controles de paginação com as informações corretas da página', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResponse,
    })

    renderWithRouter()

    await waitFor(() => {
      expect(screen.getByText(/Página/i)).toBeInTheDocument()
    })

    expect(screen.getByText((content, element) => {
      return element?.textContent === 'Página 1 de 5'
    })).toBeInTheDocument()

    const previousButton = screen.getByRole('button', { name: 'Anterior' })
    const nextButton = screen.getByRole('button', { name: 'Próxima' })

    expect(previousButton).toBeDisabled()
    expect(nextButton).not.toBeDisabled()
  })
})
