const knex = require('../connection');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const verifyUserEmail = await knex('users').where({ email }).first();

        if (verifyUserEmail) {
            return res.status(400).json('E-mail already in use')
        }

        const criptographyPassword = await bcrypt.hash(password, 10);

        const user = await knex('users').insert({ name, email, password: criptographyPassword });

        if (!user) {
            return res.status(404).json('Error 404')
        }

        return res.status(200).json('Successfully registered user')
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    registerUser
};