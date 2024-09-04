const knex = require('../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hashPassword = require('../hashPassword');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json('Email and password are required')
    }

    try {
        const user = await knex('users').where({ email: email }).first();

        if (!user) {
            return res.status(400).json("User not found");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json('E-mail or password invalid');
        }

        const userToken = {
            id: user.id,
            email: user.email
        }

        const token = jwt.sign(userToken, hashPassword, { expiresIn: '8h' });

        const { password: _, ...userData } = user;

        return res.status(200).json({
            user: userData,
            token
        })
    } catch (error) {
        return res.status(400).json('USER NOT FOUND');
    }
}

module.exports = {
    login
};