const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const router = Router();

// /api/v1/auth/login
router.post('/login', [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Минимальная длинна пароля 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        // console.log(req.body);
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

            res.json({
                token,
                ...userData
            });

        } catch (e) {
            res.status(500).json({
                message: 'Что-то пошло не так, попробуйте снова', error: e
            })
        }
    });

module.exports = router;
