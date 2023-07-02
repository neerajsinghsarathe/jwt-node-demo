const { User } = require('../models/User');
const jwt = require('jsonwebtoken');

function handleErrors(err) {
    let error = { email: '', password: '' };

    //! duplicate error code
    if (err.code === 11000) {
        error.email = 'Email is already Registered';
        return error;
    }

    //! Incorrect Email
    if (err.message == 'incorrect Email') {
        error.email = 'The email is not registered'
    }

    //! Incorrect Password
    if (err.message == 'incorrect Password') {
        error.password = 'The password is incorrect'
    }

    //! Validation Error 
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message
        })
    }
    return error;
}


maxAge = 3 * 24 * 60 * 60
function createToken(id) {
    return jwt.sign({ id }, 'secret password', {
        expiresIn: maxAge
    });
}


async function login_POST(req, res, next) {
    const { email, password } = await req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }).status(200).json({ id: user._id })
    } catch (err) {
        const error = await handleErrors(err);
        res.status(400).json({ error })
    }
}


async function signUp_POST(req, res, next) {
    const { email, password } = await req.body;
    try {
        const user = await User.create({ email: email, password: password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }).status(201).json({ id: user._id });
    } catch (err) {
        const error = await handleErrors(err);
        res.status(400).json({ error });
    }
}



module.exports = {
    signUp_POST,
    login_POST
}