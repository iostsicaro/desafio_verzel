# ENDPOINTS DA API
Esta API foi desenvolvida para gerenciar o sistema de filmes favoritos, incluindo funcionalidades de cadastro, login, busca de filmes, adição e remoção de favoritos, além de compartilhamento de listas.

**POST /register**
<p>Cria um novo usuário para o dashboard.</p>
<p>Recebe um objeto JSON com os dados do usuário no corpo da requisição.</p>

**POST /login**
<p>Realiza o login dos usuários e gera um token de autenticação válido em conjunto com um middleware.</p>

**GET /listgenres**
<p>Retorna a lista de todos os gêneros cadastrados no banco de dados.</p>

**GET /listmovies**
<p>Retorna uma lista de filmes populares da API TMDB e insere alguns livros no banco de dados caso a api externa não retorne filmes.</p>

**GET /searchmovies**
<p>Realiza a busca de filmes a partir de uma query string na API do TMDB.</p>

**GET /listfavorites**
<p>Retorna uma lista dos filmes favoritados pelo usuário.</p>

**POST /addfavorite/:movie_id**
<p>Adiciona um filme à lista de favoritos do usuário, associando o filme ao usuário no banco de dados.</p>
<p>Recebe o movie_id como parâmetro de rota.</p>

**DELETE /removefavorite/:movie_id**
<p>Remove um filme da lista de favoritos do usuário.</p>
<p>Recebe o movie_id como parâmetro de rota.</p>

**GET /share/:link_token**
<p>Permite compartilhar a lista de filmes favoritos através de um token gerado.</p>
<p>Recebe o link_token como parâmetro de rota.</p>

**POST /createlink**
<p>Cria um link de compartilhamento para a lista de filmes favoritos do usuário.</p>

**GET /userlink**
<p>Retorna o link gerado para compartilhamento dos filmes favoritados do usuário.</p>
