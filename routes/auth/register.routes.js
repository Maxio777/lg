const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const router = Router();

// /api/v1/auth/register
router.post('/register', [
        check('email', 'Некоректный email').normalizeEmail().isEmail(),
        check('password', 'Минимальная длинна пароля 6 символов').isLength({ min: 6 }),
        check('lastName', 'Минимальная длинна 2 символа').isLength({ min: 2 }),
        check('lastName', 'Минимальная длинна 2 символа').isLength({ min: 2 }),
        check('middleName', 'Минимальная длинна 2 символа').isLength({ min: 2 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }


            const { email, password, lastName, firstName, middleName } = req.body;
            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({
                    message: 'Такой пользователь уже существует'
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                password: hashedPassword,
                data: {
                    lastName,
                    firstName,
                    middleName
                }
            });

            await newUser.save();
            res.status(201).json({
                message: `Пользователь ${lastName} ${firstName} ${middleName} создан`
            })

        } catch (e) {
            res.status(500).json({
                message: 'Что-то пошло не так, попробуйте снова', error: e
            })
        }
});

module.exports = router;
