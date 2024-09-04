ENDPOINTS DA API
POST /register
Endpoint para atender a funcionalidade de criar um novo usuário para o dashboard. Ele deverá receber os dados do usuário através de objeto JSON no corpo da requisição no formato abaixo.

POST /login
Endpoint para realização de login dos usuários no dashboard, de forma que realize:

A autenticação dos usuários, gerando e retornando token válido como resposta

GET /listgenres
Endpoint para retornar uma lista de todos generos cadastrados no banco de dados.

GET /produtos/:id
Endpoint para retornar os detalhes de um produto em específico.

GET /listmovies
Endpoint para retornar uma lista de todos os filmes vindos pela API do TMDB.

GET /searchmovies
Endpoint para retornar uma lista de todos os filmes procurados pelo usuário a partir de uma query com retorno vindo pela API do TMDB.

POST /add-favorite
Endpoint para adicionar filme favoritado com relação de normalização entre a tabela de usuário e filmes.

DELETE /remove-favorite/:id
Endpoint para excluir um filme e favorito existente. Não deverá receber conteúdo no corpo da requisição, mas deverá receber o ID do filme através de parâmetro de rota (params).
