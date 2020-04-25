const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const Tournament = require('../../models/Tournament');
const router = Router();
const auth = require('../../middleware/auth');


// /api/v1/admin/tournaments
router.get('/tournaments',
    async (req, res) => {
        try {
            const tournaments = await Tournament.find();

            if (!tournaments) {
                return res.status(400).json({ message: 'Турниры еще не соданы' })
            }
            res.status(200).json(tournaments)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.post('/tournaments', auth, [
        check('name', 'Минимальная длинна названия турнира 5 символов').isLength({ min: 5 }),
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

            const { name } = req.body;
            const tournament = await Tournament.findOne({ name });

            if (tournament) {
                return res.status(400).json({ message: 'Турнир с таким названием уже существует' })
            }

            const newTournament = new Tournament( req.body );
            await newTournament.save();
            res.status(201).json({ message: `Турнир "${name}" создан`, newTournament: newTournament })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.put('/tournaments', auth, [
        check('name', 'Минимальная длинна названия турнира 5 символов').isLength({ min: 5 }),
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

            const { _id, name, dateStart, dateEnd, completed, format } = req.body;
            const tournament = await Tournament.findOne({ _id });
            if (!tournament) {
                return res.status(400).json({ message: 'Турнир не найден' })
            }

            console.log('перед торнамент сейв');
            await tournament.update(
                req.body
            );
            res.status(201).json({ message: `Турнир "${name}" обновлен`, newTournament: tournament })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.delete('/tournaments/', auth,
    async (req, res) => {
        try {
            const { _id } = req.query;
            const tournament = await Tournament.findOne({ _id });

            if (!tournament) {
                return res.status(400).json({ message: 'Турнир не найден del', id: _id })
            }

            await tournament.remove();
            res.status(201).json({ message: `Турнир "${_id}" был удален` })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

module.exports = router;
