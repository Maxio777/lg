const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const Manager = require('../../models/Manager');
const router = Router();
const auth = require('../../middleware/auth');


// /api/v1/admin/manager
router.get('/manager/',
    async (req, res) => {
        try {
            const manager = await Manager.find();

            if (!manager) {
                return res.status(400).json({ message: 'Судьи еще не добавлены' })
            }
            res.status(200).json(manager)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.post('/manager', auth, [
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
            const manager = await Manager.findOne({ firstName, lastName, middleName  });

            if (manager) {
                return res.status(400).json({ message: 'Игрок с таким именем уже существует' })
            }

            const newManager = new Manager({ birthday, lastName, firstName, middleName, image });
            await newManager.save();
            res.status(201).json({ message: `Игрок "${lastName} ${firstName} ${middleName}" добавлен`, newManager })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.put('/manager', auth, [
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
            const manager = await Manager.findOne({ _id  });

            if (!manager) {
                return res.status(400).json({ message: 'Игрок не найден' })
            }

            await manager.update({
                birthday, lastName, firstName, middleName, image
            });
            res.status(201).json({ message: `Игрок "${lastName} ${firstName} ${middleName}" обновлен`, manager })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.delete('/manager/:_id', auth,
    async (req, res) => {
        try {
            const { _id } = req.params;
            const manager = await Manager.findOne({ _id });

            if (!manager) {
                return res.status(400).json({ message: 'Турнир не найден', id: _id })
            }

            await manager.remove();
            res.status(201).json({ message: `Игрок "${_id}" был удален` })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

module.exports = router;
