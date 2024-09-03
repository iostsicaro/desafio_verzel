const knex = require('../connection');
const instanceAxios = require('../services/tmdb');

const listMovies = async (req, res) => {
    try {
        const filmes = await instanceAxios.get('movie/popular');

        return res.status(200).json(filmes.data);
    } catch (error) {
        const { data: { errors }, status } = error.response;

        return res.status(status).json({
            erro: `${errors[0].parameter_name} - ${errors[0].message}`
        });
    }
}

const searchMovies = async (req, res) => {

}

const addFavorites = async (req, res) => {

}

const removeFavorites = async (req, res) => {

}

module.exports = {
    listMovies,
    searchMovies,
    addFavorites,
    removeFavorites,
};