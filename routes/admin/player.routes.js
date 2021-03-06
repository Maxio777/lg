const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const Player = require('../../models/Player');
const router = Router();
const auth = require('../../middleware/auth');
const fileMiddleware = require('../../middleware/file');



// /api/v1/admin/player
router.get('/player/',
    async (req, res) => {
        try {
            const player = await Player.find(  );

            if (!player) {
                return res.status(400).json({ message: 'Судьи еще не добавлены' })
            }
            res.status(200).json(player)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.post('/player', auth, [
        check('lastName', 'Должно быть минимум 2 буквы').isLength({ min: 2 }),
        check('firstName', 'Должно быть минимум 2 буквы').isLength({ min: 2 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            const { birthday, lastName, firstName, middleName, image } = req.body;
            const player = await Player.findOne({ firstName, lastName, middleName  });

            if (player) {
                return res.status(400).json({ message: 'Игрок с таким именем уже существует' })
            }

            const newPlayer = new Player({ birthday, lastName, firstName, middleName, image });
            await newPlayer.save();
            res.status(201).json({ message: `Игрок "${lastName} ${firstName} ${middleName}" добавлен`, newPlayer })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.put('/player/:_id', auth, fileMiddleware.single('image'), [
        check('lastName', 'Должно быть минимум 2 буквы').isLength({ min: 2 }),
        check('firstName', 'Должно быть минимум 2 буквы').isLength({ min: 2 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            const _id = req.params._id


            const { birthday, lastName, firstName, middleName, image } = req.body;
            const player = await Player.findOne({ _id  });

            if (!player) {
                return res.status(400).json({ message: 'Игрок не найден' })
            }

            const updated = {
                lastName, firstName,
            }

            if (middleName) {
                updated.middleName = middleName
            }

            if (birthday) {
                console.log('birthday', birthday)
                console.log('birthday', typeof birthday)
                updated.birthday = birthday
            }

            if (req.file) {
                updated.img = req.file.path
            }

            console.log(updated)

            const updatedPlayer = await Player.findOneAndUpdate(
              { _id },
              { $set: updated },
              { new: true }
            );

            res.status(201).json({ message: `Игрок "${lastName} ${firstName}" обновлен`, updatedPlayer })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.delete('/player/:_id', auth,
    async (req, res) => {
        try {
            const { _id } = req.params;
            const player = await Player.findOne({ _id });

            if (!player) {
                return res.status(400).json({ message: 'Турнир не найден del', id: _id })
            }

            await player.remove();
            res.status(201).json({ message: `Игрок "${_id}" был удален` })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

module.exports = router;
