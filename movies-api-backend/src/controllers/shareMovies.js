const knex = require('../connection');
const crypto = require('crypto');

const createLink = async (req, res) => {
    const { user } = req;

    try {
        const findUser = await knex('users').where({ id: user.id }).first();

        if (!findUser) {
            return res.status(404).json('User not found');
        }

        const token = crypto.randomBytes(16).toString('hex');

        const createLink = await knex('share_links').insert({ user_id: user.id, link_token: token });

        if (!createLink) {
            return res.status(404).json('Unable to create link.');
        }

        const shareLink = {
            link: `${req.protocol}://${req.get('host')}/sharelink/${token}`,
            link_token: token
        };

        res.status(201).json(shareLink);
    } catch (error) {
        const { data: { status_message }, status } = error.response;

        return res.status(status).json(status_message);
    }
}

const shareLink = async (req, res) => {
    const { user } = req;

    try {
        const findUserToken = await knex('share_links').where({ user_id: user.id }).first();

        if (!findUserToken) {
            return res.status(404).json('Share link not found');
        }

        const favoriteMovies = await knex('favorite_movies')
            .where({ users_id: user.id })
            .join('movies', 'movies.id', '=', 'favorite_movies.movies_id')
            .select('movies.title', 'movies.description', 'movies.popularity', 'movies.release_date', 'movies.url_image')
        ;

        if (!favoriteMovies) {
            return res.status(404).json('Favorite movies not found');
        }

        res.status(200).json(favoriteMovies);
    } catch (error) {
        const { data: { status_message }, status } = error.response;

        return res.status(status).json(status_message);
    }
}

module.exports = {
    createLink,
    shareLink
};