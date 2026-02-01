import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import SearchBar from '../../components/SearchBar'

describe('SearchBar', () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    )
  }

  it('deve renderizar o input e o botão de pesquisa', () => {
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

  it('deve exibir erro quando o username tem caracteres inválidos', async () => {
    const user = userEvent.setup()
    renderWithRouter()

    const input = screen.getByPlaceholderText('Digite um username...')
    await user.type(input, 'test@user')

    const button = screen.getByRole('button', { name: 'Pesquisar' })
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText('Verifique hifens ou caracteres especiais.')).toBeInTheDocument()
    })
  })
})
