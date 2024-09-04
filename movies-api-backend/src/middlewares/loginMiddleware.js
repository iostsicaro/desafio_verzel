const knex = require('../connection');
const jwt = require('jsonwebtoken');
const hashPassword = require('../hashPassword');

const loginMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Access Denied')
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, hashPassword);

        const verifyUser = await knex('users').where({ id: id }).first();

        if (!verifyUser) {
            return res.status.json('User not found.')
        }

        const { password, ...user } = verifyUser;

        req.user = user;

        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = loginMiddleware;