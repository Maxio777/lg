const { Router } = require('express');
const router = Router();
const controller = require('../../controllers/auth')
const { isEmail, isLength } = require('../../middleware/validators')

const loginValidators = [isEmail(), isLength('password',6)]
const registerValidators = [
    isEmail(),
    isLength('password',6),
    isLength('lastName',2),
    isLength('firstName',2),
    isLength('middleName',2)
]


router.post('/login', loginValidators, controller.login); // /api/v1/auth/login
router.post('/register', registerValidators, controller.register); // /api/v1/auth/register


module.exports = router;
