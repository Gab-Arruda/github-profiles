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

## Comentários sobre a Implementação

- A aplicação foi construída de maneira responsiva, com suporte a mobile.
- Componentes criados para maior modularidade e reuso.
- Utilização do framework CSS **Tailwind** para agilizar o desenvolvimento e facilitar a responsividade.
- Testes realizados, disponíveis na pasta `/tests`.
- Implementação de lazy loading para carregamento de páginas somente quando necessário.
- Uso do localstorage para salvar/atualizar os perfis visualizados, permitindo visualização offline.

## Como Rodar o Projeto

### Pré-requisitos

- **Node** instalado.

### Executar a Aplicação

No diretório raiz do projeto:

1. Instale as dependências: 
   ```bash
   npm install
   ```
2. Inicie o servidor: 
   ```bash
   npm run dev
   ```
3. Para rodar os testes: 
   ```bash
   npm test
   ```

## Hospedagem

A aplicação está disponível em: [https://main.d3pu1bnxzi455w.amplifyapp.com/](https://main.d3pu1bnxzi455w.amplifyapp.com/)

## Estrutura do Projeto

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