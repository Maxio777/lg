const { Router } = require('express');
const router = Router();
const controller = require('../../controllers/auth')
const { check } = require('express-validator');

const loginValidators = [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Минимальная длинна пароля 6 символов').isLength({ min: 6 })
    ]

const registerValidators = [
    check('email', 'Некоректный email').normalizeEmail().isEmail(),
    check('password', 'Минимальная длинна пароля 6 символов').isLength({ min: 6 }),
    check('lastName', 'Минимальная длинна 2 символа').isLength({ min: 2 }),
    check('firstName', 'Минимальная длинна 2 символа').isLength({ min: 2 }),
    check('middleName', 'Минимальная длинна 2 символа').isLength({ min: 2 }),
]

// /api/v1/auth/login
router.post('/login', loginValidators, controller.login);

// /api/v1/auth/register
router.post('/register', registerValidators, controller.register);


module.exports = router;
