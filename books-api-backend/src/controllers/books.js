const instanceAxios = require('../services/tmdb');

const listarFilmes = async (req, res) => {
    try {
        const filmes = await instanceAxios.get('movie/popular');

        return res.json(filmes.data);
    } catch (error) {
        const { data: { errors }, status } = error.response;

        return res.status(status).json({
            erro: `${errors[0].parameter_name} - ${errors[0].message}`
        })
    }
}

module.exports = {
    listarFilmes,
};