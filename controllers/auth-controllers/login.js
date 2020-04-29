const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../../models/User');
const errorHandler = require('../../utils/errorHandler')

const { isEmail, isLength } = require('../../middleware/validators')
const loginValidators = [isEmail(), isLength('password',6)]


module.exports.login = [loginValidators, async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему'
            })
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Пользователь не найден'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'Неверный пароль'
            })
        }

        const userData = {
            userId: user.id,
            fullName: user.data.lastName +' '+ user.data.firstName,
        };

        const token = jwt.sign(
            { ...userData }, config.get('jwtSecret'),
            { expiresIn: '24h' }
        );

        res.json({ token, ...userData });

    } catch (e) {
        errorHandler(res, e)
    }
}]
