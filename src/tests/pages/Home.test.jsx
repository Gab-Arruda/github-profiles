import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Home from '../../pages/Home'
import SearchResult from '../../pages/SearchResult'

global.fetch = vi.fn()

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(window.navigator, 'onLine', {
      writable: true,
      value: true,
    })
  })

  const renderWithRouter = () => {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:username" element={<SearchResult />} />
        </Routes>
      </MemoryRouter>
    )
  }

  it('deve renderizar o título e descrição da página', () => {
    renderWithRouter()

    expect(screen.getByText('GitHub Profiles')).toBeInTheDocument()
    expect(screen.getByText('Procure perfis do GitHub.')).toBeInTheDocument()
  })

  it('deve renderizar a barra de busca com input e botão', () => {
    renderWithRouter()

    const input = screen.getByPlaceholderText('Digite um username...')
    const button = screen.getByRole('button', { name: 'Pesquisar' })

    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('deve exibir erro quando o campo está vazio', async () => {
    const user = userEvent.setup()
    renderWithRouter()

    const button = screen.getByRole('button', { name: 'Pesquisar' })
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText('O campo não pode estar vazio.')).toBeInTheDocument()
    })
  })

  it('deve exibir erro quando o username excede 39 caracteres', async () => {
    const user = userEvent.setup()
    renderWithRouter()

    const input = screen.getByPlaceholderText('Digite um username...')
    const longUsername = 'a'.repeat(40)
    
    await user.type(input, longUsername)
    const button = screen.getByRole('button', { name: 'Pesquisar' })
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText('Máximo de 39 caracteres.')).toBeInTheDocument()
    })
  })

  it('deve navegar para a página de busca com um username válido', async () => {
    const user = userEvent.setup()
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        total_count: 1,
        items: [
          {
            login: 'testuser',
            avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
          },
        ],
      }),
    })

    renderWithRouter()

    const input = screen.getByPlaceholderText('Digite um username...')
    await user.type(input, 'testuser')
    
    const button = screen.getByRole('button', { name: 'Pesquisar' })
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText(/Resultados para:/i)).toBeInTheDocument()
    })
  })
})
