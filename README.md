# Github Profiles

Este projeto implementa uma aplicação frontend em React para buscar e exibir perfis do GitHub.

### Experiência do usuário na navegaçao pelo projeto

- Página inicial com um campo para busca de perfis no GitHub através de username. Busca é ativada por tecla Enter ou clicando no botão "Pesquisar".
- Em caso de inserção de username que não segue as regras do GitHub, uma mensagem de erro é exibida ao usuário.
- Feedback textual de carregamento enquanto a request para o GitHub não é finalizada.
- Caso não haja perfis correspondentes, uma mensagem de erro customizada informa o usuário do ocorrido.
- Caso haja retorno de perfis, uma listagem é exibida de maneira paginada. Ao clicar em qualquer perfil o usuário é redirecionado para a página de visualização de perfil.
- A página de visualização de perfil exibe dados do usuário, como nome, descrição, avatar, etc. Também a uma listagem paginada dos repositórios que, ao serem clicados, redirecionam para a página do repositório no GitHub. Essa listagem possui filtro por nome e quantidade de estrelas.
- No header, o usuário pode ir para a página de exibição de perfis visualizados. Essa página permite a visualização de perfis de maneira offline.
- Ao ver um perfil novamente, os dados salvos são exibidos. Porém o usuário é alertado disso por um campo informando a data de visualização e oferendo a opção de buscar os dados mais recentes.
- Ao realizar requests para o GitHub, seja na listagem de perfis ou na página de exibição de perfil, caso a conexão com a internet seja perdida, um modal é exibido informando a situação ao usuário. Ele então a opção de continuar na página atual ou ir para a página de Perfis Visualizados.

### Comentários sobre a implementação

- A aplicação foi construída de maneira responsiva, possui suporte a mobile.
- Componentes foram criados para permitir uma maior modularidade do sistema, bem como o reuso.
- Foi utilizado o framework CSS `Tailwind`, para agilizar o desenvolvimento e facilitar a responsividade.
- Testes foram feitos e se encontram na pasta `/tests`.
- Este projeto utiliza lazy loading para carregamento de páginas somente quando necessário.
- O localstorage foi utilizado para salvar/atualizar os perfis visualizados, permitindo sua visualização de maneira offline.

### Como rodar o projeto

Pré requisitos

- Node instalado.

#### Executar a aplicação

No diretório raiz do projeto:

- Instale as dependências: `npm install`.
- Inicie o servidor: `npm run dev`.
- Parar rodar os testes: `npm test`.

### Estrutura do Projeto

```
github-profiles/
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── LoadingFallback.jsx
│   │   ├── OfflineModal.jsx
│   │   ├── ProfileList.jsx
│   │   └── SearchBar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── OfflineProfiles.jsx
│   │   ├── Profile.jsx
│   │   └── SearchResult.jsx
│   ├── tests/
│   │   ├── components/
│   │   │   ├── ProfileList.test.jsx
│   │   │   └── SearchBar.test.jsx
│   │   └── pages/
│   │       ├── Home.test.jsx
│   │       ├── Profile.test.jsx
│   │       └── SearchResult.test.jsx
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── setupTests.js
├── public/
├── eslint.config.js
├── package.json
├── vite.config.js
├── vitest.config.js
├── index.html
└── README.md
```