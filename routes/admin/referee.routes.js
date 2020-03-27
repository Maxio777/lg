const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const Referee = require('../../models/Referee');
const router = Router();
const auth = require('../../middleware/auth');


// /api/v1/admin/referee
router.get('/referee',
    async (req, res) => {
        try {
            const referee = await Referee.find();

            if (!referee) {
                return res.status(400).json({ message: 'Судьи еще не добавлены' })
            }
            res.status(200).json(referee)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.post('/referee', auth, [
        check('lastName', 'Должно быть минимум 2 буквы').isLength({ min: 2 }),
        check('firstName', 'Должно быть минимум 2 буквы').isLength({ min: 2 }),
    ],
    async (req, res) => {
        console.log(req.body);
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            const { birthday, lastName, firstName, middleName, image } = req.body;
            const referee = await Referee.findOne({ firstName, lastName, middleName  });

            if (referee) {
                return res.status(400).json({ message: 'Судья с таким именем уже существует' })
            }

            const newReferee = new Referee({ birthday, lastName, firstName, middleName, image });
            await newReferee.save();
            res.status(201).json({ message: `Судья "${lastName} ${firstName} ${middleName}" добавлен`, newReferee })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.put('/referee', auth, [
        check('lastName', 'Должно быть минимум 2 буквы').isLength({ min: 2 }),
        check('firstName', 'Должно быть минимум 2 буквы').isLength({ min: 2 }),
    ],
    async (req, res) => {
        console.log(req.body);
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            const { _id, birthday, lastName, firstName, middleName, image } = req.body;
            const referee = await Referee.findOne({ _id  });

            if (!referee) {
                return res.status(400).json({ message: 'Судья не найден' })
            }

            await referee.update({
                birthday, lastName, firstName, middleName, image
            });
            res.status(201).json({ message: `Судья "${lastName} ${firstName} ${middleName}" обновлен`, referee })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.delete('/referee/', auth,
    async (req, res) => {
        try {
            const { _id } = req.query;
            const referee = await Referee.findOne({ _id });

            if (!referee) {
                return res.status(400).json({ message: 'Турнир не найден del', id: _id })
            }

            await referee.remove();
            res.status(201).json({ message: `Судья "${_id}" был удален` })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

module.exports = router;
