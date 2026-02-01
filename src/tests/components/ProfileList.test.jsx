import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProfileList from '../../components/ProfileList'

describe('ProfileList', () => {
  const mockProfiles = [
    {
      login: 'user1',
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    },
    {
      login: 'user2',
      avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
    },
    {
      login: 'user3',
      avatar_url: 'https://avatars.githubusercontent.com/u/3?v=4',
    },
  ]

  const renderWithRouter = (items, isOffline = false) => {
    return render(
      <MemoryRouter>
        <ProfileList items={items} isOffline={isOffline} />
      </MemoryRouter>
    )
  }

  it('deve renderizar lista vazia quando nenhum item é passado', () => {
    renderWithRouter([])

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    expect(list.children).toHaveLength(0)
  })

  it('deve renderizar todos os perfis com seus links corretos', () => {
    renderWithRouter(mockProfiles)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(mockProfiles.length)

    mockProfiles.forEach((profile) => {
      const link = screen.getByRole('link', { name: new RegExp(profile.login, 'i') })
      expect(link).toHaveAttribute('href', `/profile/${profile.login}`)
    })
  })

  it('deve adicionar parâmetro offline=true aos links quando isOffline é true', () => {
    renderWithRouter(mockProfiles, true)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(mockProfiles.length)

    mockProfiles.forEach((profile) => {
      const link = screen.getByRole('link', { name: new RegExp(profile.login, 'i') })
      expect(link).toHaveAttribute('href', `/profile/${profile.login}?offline=true`)
    })
  })
})
