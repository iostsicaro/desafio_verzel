CREATE DATABASE desafio_verzel:

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial NOT NULL PRIMARY KEY,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULl UNIQUE,
  password text NOT NULL
);

DROP TABLE IF EXISTS genre;

CREATE TABLE genre (
  id integer NOT NULL PRIMARY KEY,
  name varchar(100) NOT NULL
);

DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  id serial NOT NULL PRIMARY KEY,
  original_title varchar(100) NOT NULL,
  overview varchar(8000) NOT NULL,
  popularity double precision NOT NULL,
  release_date DATE NOT NULL,
  url_image varchar(255)
);

DROP TABLE IF EXISTS favorite_movies;

CREATE TABLE favorite_movies (
  id integer NOT NULL,
  users_id integer NOT NULL,
  movies_id integer NOT NULL,
  original_title varchar(100) NOT NULL,
  overview varchar(8000) NOT NULL,
  popularity double precision NOT NULL,
  release_date DATE NOT NULL,
  url_image varchar(255),
  FOREIGN KEY (users_id) REFERENCES users (id),
  FOREIGN KEY (movies_id) REFERENCES movies (id)
);

DROP TABLE IF EXISTS share_links;

CREATE TABLE share_links (
  id serial PRIMARY KEY,
  user_id integer NOT NULL,
  link_token varchar(255) NOT NULL UNIQUE,
  created_at timestamp DEFAULT current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

/* INSERÇÃO MANUAL DE VALORES NAS TABELAS */
INSERT INTO genre
(id, name)
VALUES
(28, 'Ação'),
(12, 'Aventura'),
(16, 'Animação'),
(35, 'Comédia'),
(80, 'Crime'),
(99, 'Documentário'),
(18, 'Drama'),
(10751, 'Família'),
(14, 'Fantasia'),
(36, 'História'),
(27, 'Terror'),
(10402, 'Música'),
(9648, 'Mistério'),
(10749, 'Romance'),
(878, 'Ficção científica'),
(10770, 'Cinema TV'),
(53, 'Thriller'),
(10752, 'Guerra'),
(37, 'Faroeste');