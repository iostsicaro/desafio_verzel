# Gerenciamento de Listas de Filmes

Este projeto foi desenvolvido como parte do desafio para a vaga de Desenvolvedor Júnior na Verzel. O desafio consistiu em criar uma aplicação para o gerenciamento de listas de filmes, permitindo adicionar e remover favoritos. O projeto integra as stacks de frontend, backend e banco de dados, utilizando a API externa do TMDB como base para os dados dos filmes.

## Funcionalidades

- **Listar Filmes**: Exibe uma lista de filmes populares utilizando dados da API do TMDB.
- **Adicionar/Remover Favoritos**: Permite ao usuário marcar filmes como favoritos e removê-los da lista de favoritos (CONCLUIDO NO BACKEND).
- **Detalhes do Filme**: Exibe informações detalhadas nos cards.
- **Busca de Filmes**: Função para procurar filmes específicos na base de dados do TMDB (CONCLUIDO NO BACKEND).
- **Gerenciamento de Estado**: Utiliza `useLocalStorage` para persistir a token do usuário.
- **Formulários em React**: Implementação de formulários com validação para funcionalidades específicas.
  
## Tecnologias Utilizadas

### Frontend

- **React**: Utilizado para a construção da interface do usuário.
- **React Hook Form**: Para manipulação e validação de formulários.
- **Context API**: Para gerenciamento de estado global.
- **Axios**: Para comunicação com a API do TMDB.
- **Styled Components**: Para estilização dos componentes.

### Backend

- **Node.js**
- **Express**
- **Knex.js**
- **PostgreSQL**
- **Jsonwebtoken**
- **dotenv**
- **crypto**
- **bcrypt**

### API Externa

- **TMDB API**: Utilizada para buscar dados atualizados sobre filmes.

## Como Executar o Projeto

### Pré-requisitos

- Node.js
- PostgreSQL

### Passos para Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/iostsicaro/desafio_verzel.git
   cd desafio_verzel

2. **Instale as dependências do backend:**
   ```bash
   cd movies-api-backend
   npm install

3. **Configure o banco de dados: Crie um banco de dados PostgreSQL e configure as variáveis de ambiente no arquivo .env.**
   ```bash
   DB_HOST=
   DB_USER=
   DB_PASSWORD=
   DB_DATABASE=

   TMDB_KEY=

   SH_SECRET=

4. **Inicie o servidor backend utilizando nodemon com o seguinte script:**
   ```bash
   npm run dev

5. **Instale as dependências do frontend:**
   ```bash
   cd movies-frontend
   npm install

6. **Inicie o servidor frontend:**
   ```bash
   npm start

7. **Acesse a aplicação:**
   O frontend estará disponível em http://localhost:3001
   O backend estará disponível em http://localhost:3000

**Requisitos Funcionais que não foram desenvolvidos:**
- Deploy
- Responsividade
----------------------------------------------------------------------------------------------------

Contato
Caso tenha alguma dúvida ou sugestão, entre em contato:

Nome: Ícaro Oliveira Santos
E-mail: iostsicaro@gmail.com
Linkedin: https://www.linkedin.com/in/santosicaro/

Desenvolvido por Ícaro Oliveira Santos como parte do desafio para a vaga de Desenvolvedor Júnior na Verzel.
Esse README.md cobre os aspectos principais do projeto e fornece instruções claras para que qualquer pessoa consiga rodá-lo localmente.
