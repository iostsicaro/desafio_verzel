const knex = require('../connection');
const crypto = require('crypto');

const userLink = async (req, res) => {
    const { user } = req;

    try {
        const link = await knex('share_links').where({ user_id: user.id }).first();

        if (!link) {
            return res.status(404).json('Link not found');
        }
        
        res.status(200).json(link);
    } catch (error) {
        const { data: { status_message }, status } = error.response;

        return res.status(status).json(status_message);
    }
}

const createLink = async (req, res) => {
    const { user } = req;

    try {
        const findUser = await knex('users').where({ id: user.id }).first();

        if (!findUser) {
            return res.status(404).json('User not found');
        }

        const token = crypto.randomBytes(16).toString('hex');

        const checkingUserLinkExistence =  await knex('share_links').where({ user_id: user.id }).first();

        if (checkingUserLinkExistence) {
            return res.status(400).json('Link already exist');
        }

        const createLink = await knex('share_links').insert({ user_id: user.id, link_token: token });

        if (!createLink) {
            return res.status(400).json('Unable to create link.');
        }

        const shareLink = {
            id: user.id,
            name: user.name,
            link: `${req.protocol}://${req.get('host')}/${token}`,
            link_token: token
        };

        res.status(201).json(shareLink);
    } catch (error) {
        const { data: { status_message }, status } = error.response;

        return res.status(status).json(status_message);
    }
}

const shareLink = async (req, res) => {
    const { link_token } = req.params;

    try {
        const findUserToken = await knex('share_links').where({ link_token: link_token }).first();

        if (!findUserToken) {
            return res.status(404).json('Share link not found');
        }
        
        const favoriteMovies = await knex('favorite_movies').where({ users_id: findUserToken.user_id });

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
    userLink,
    createLink,
    shareLink
};