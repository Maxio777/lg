const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const User = require('../../models/User')
const errorHandler = require('../../utils/errorHandler')

const { isEmail, isLength } = require('../../middleware/validators')
const registerValidators = [
    isEmail(),
    isLength('password',6),
    isLength('lastName',2),
    isLength('firstName',2),
    isLength('middleName',2)
]

module.exports.register = [registerValidators, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }


        const { email, password, lastName, firstName, middleName } = req.body
        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({
                message: 'Такой пользователь уже существует'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new User({
            email,
            password: hashedPassword,
            data: {
                lastName,
                firstName,
                middleName
            }
        })

        await newUser.save()
        res.status(201).json({
            message: `Пользователь ${lastName} ${firstName} ${middleName} создан`
        })

    } catch (e) {
        errorHandler(res, e)
    }
}]
