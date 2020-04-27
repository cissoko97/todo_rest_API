const MAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/;

module.exports = {
    authRegistrationValidator: (req, res, next) => {
        const { name, email, password, passwordConfirm, phone } = req.body;

        const errors = {}
        if (!email || !email.match(MAIL_REGEX))
            errors.email = 'Invalide fiels email.';

        if (!password || !password.match(PASSWORD_REGEX))
            errors.password = 'Invalide fiels password.';

        if (!passwordConfirm || passwordConfirm !== password)
            errors.passwordConfirm = 'Password and password-confirm are not same.'

        if (!name || name.length <= 4 || name.length > 15) {
            errors.name = 'Must not be empty and not grant than [4;15[.'
        }

        if (!phone || phone.length < 9 || phone.length > 12) {
            errors.phone = 'Must not be empty adnd must contains [9;12].'
        }
        if (Object.keys(errors).length > 0) {
            console.log(errors)
            return res.status(400).json(errors)
        }
        next();
    },
    authLoginValidator: (req, res, next) => {
        const { email, password } = req.body;
        const errors = {}
        if (!email || !email.match(MAIL_REGEX))
            errors.email = 'Invalide fiels email';

        if (!password || !password.match(PASSWORD_REGEX))
            errors.password = 'invalide fiels password';

        if (Object.keys(errors).length > 0) {
            console.log(errors)
            return res.status(400).json(errors)
        }
        next();
    }
}