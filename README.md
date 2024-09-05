# Gerenciamento de Listas de Filmes

Este projeto foi desenvolvido como parte do desafio para a vaga de Desenvolvedor Júnior na Vercel. O desafio consistiu em criar uma aplicação para o gerenciamento de listas de filmes, permitindo adicionar e remover favoritos. O projeto integra as stacks de frontend, backend e banco de dados, utilizando a API externa do TMDB como base para os dados dos filmes.

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

- **Node.js**: Ambiente de execução para o JavaScript no servidor.
- **Express**: Framework para construção da API RESTful.
- **Knex.js**: Query builder para integração com o banco de dados.
- **PostgreSQL**: Banco de dados utilizado para armazenar as informações.

### API Externa

- **TMDB API**: Utilizada para buscar dados atualizados sobre filmes.

## Como Executar o Projeto

### Pré-requisitos

- Node.js
- PostgreSQL

### Passos para Execução

1. **Clone o repositório:**
   ```bash
   [git clone https://github.com/seu-usuario/gerenciamento-filmes.git](https://github.com/iostsicaro/desafio_verzel.git)
   cd desafio_verzel

2. **Instale as dependências do backend:**
cd movies-api-backend
npm install

3. **Configure o banco de dados:**
Crie um banco de dados PostgreSQL e configure as variáveis de ambiente no arquivo .env.

4. **Inicie o servidor backend utilizando nodemon com o seguinte script:**
npm run dev ou npm start

5. **Instale as dependências do frontend:**
cd movies-frontend
npm install

6. **Inicie o servidor frontend:**
npm start

7. **Acesse a aplicação:**
O frontend estará disponível em http://localhost:3001
O backend estará disponível em http://localhost:3000

**Requisitos Funcionais que não foram desenvolvidos:**
- Requisição no frontend para adicionar filme e favorito ao bando de dados. Apenas foi concluída a mudançã de estado do icon de favorito.
- Requisição para get das imagens para os card no frontend e no backend
- Busca de filmes no frontend
- Deploy
- Lógica para compartilhar a lista de favoritos via link.
----------------------------------------------------------------------------------------------------

Contato
Caso tenha alguma dúvida ou sugestão, entre em contato:

Nome: Ícaro Oliveira Santos
E-mail: iostsicaro@gmail.com
Linkedin: https://www.linkedin.com/in/santosicaro/

Desenvolvido por Ícaro Oliveira Santos como parte do desafio para a vaga de Desenvolvedor Júnior na Vercel.
Esse README.md cobre os aspectos principais do projeto e fornece instruções claras para que qualquer pessoa consiga rodá-lo localmente.
