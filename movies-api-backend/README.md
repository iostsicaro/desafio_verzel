#ENDPOINTS DA API
Esta API foi desenvolvida para gerenciar o sistema de filmes favoritos, incluindo funcionalidades de cadastro, login, busca de filmes, adição e remoção de favoritos, além de compartilhamento de listas.

**POST /register**
*Cria um novo usuário para o dashboard.*
Recebe um objeto JSON com os dados do usuário no corpo da requisição.

**POST /login**
Realiza o login dos usuários e gera um token de autenticação válido em conjunto com um middleware.

**GET /listgenres**
Retorna a lista de todos os gêneros cadastrados no banco de dados.

**GET /listmovies**
Retorna uma lista de filmes populares da API TMDB e insere alguns livros no banco de dados caso a api externa não retorne filmes.

**GET /searchmovies**
Realiza a busca de filmes a partir de uma query string na API do TMDB.

**GET /listfavorites**
Retorna uma lista dos filmes favoritados pelo usuário.

**POST /addfavorite/:movie_id**
Adiciona um filme à lista de favoritos do usuário, associando o filme ao usuário no banco de dados.
Recebe o movie_id como parâmetro de rota.

**DELETE /removefavorite/:movie_id**
Remove um filme da lista de favoritos do usuário.
Recebe o movie_id como parâmetro de rota.

**GET /share/:link_token**
Permite compartilhar a lista de filmes favoritos através de um token gerado.
Recebe o link_token como parâmetro de rota.

**POST /createlink**
Cria um link de compartilhamento para a lista de filmes favoritos do usuário.

**GET /userlink**
Retorna o link gerado para compartilhamento dos filmes favoritados do usuário.
