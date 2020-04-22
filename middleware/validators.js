const { check } = require('express-validator');
const symbols = (num) => num > 4 ? 'символов' : 'символа';


module.exports = {
    isEmail: () => check('email', 'Некоректный email').isEmail(),
    isLength: (param, min) => check(param, `Минимальная длинна пароля ${min} ${symbols(min)}`).isLength({ min: min })
}
