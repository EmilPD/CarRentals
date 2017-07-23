const bcrypt = require('bcrypt');

class AuthController {
    constructor(data) {
        this.data = data;
    }

    getRegisterForm(req, res) {
        return res.render('auth/register');
    }
    getLogInForm(req, res) {
        return res.render('auth/login');
    }
    logOut(req, res) {
        req.logout();
        return res.redirect('/');
    }

    register(req, res, next) {
        const bodyUser = req.body;
        this.data.users.findByUsername(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    throw new Error('User already exists');
                }
                return this._generateHash(bodyUser);
            })
            .then((newUser) => {
                return this.data.users.create(newUser);
            })
            .then((dbUser) => {
                return res.redirect('/auth/login');
            })
            .catch((err) => {
                req.flash('error', err);
            });
    }

    _generateHash(bodyUser) {
        const promise = new Promise((res, rej) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return rej(err);
                }
                return bcrypt.hash(bodyUser.password, salt, (error, hash) => {
                    if (err) {
                        return rej(error);
                    }

                    bodyUser.passHash = hash;
                    return res(bodyUser);
                });
            });
        });
        return promise;
    }
}

const init = (data) => {
    return new AuthController(data);
};

module.exports = { init };
