const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const Team = require('../../models/Team');
const Game = require('../../models/Game');
const router = Router();
const auth = require('../../middleware/auth');

// /api/v1/admin/team
router.get('/team',
    async (req, res) => {
        console.log(req.body);
        try {
            const team = await Team.find({})
                .populate('players')
                .populate('managers');

            if (!team.length) {
                return res.status(400).json({ message: 'Команды еще не добавлены' })
            }

            res.status(200).json(team)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

// /api/v1/admin/team/id
router.get('/team/:id',
    async (req, res) => {
        console.log(1, req.body);
        try {
            const { id } = req.params;
            const team = await Team.findOne({ _id: id })
                .populate('managers');

            if (!team) {
                return res.status(400).json({ message: 'Команда не найдена' })
            }

            const gamesHome = await Game.find({ home: id});
            const gamesGuest = await Game.find({ guest: id});
            const games = [...gamesHome, ...gamesGuest];
            team._doc.games = games.length ? games.map(game => game._id) : [];
            res.status(200).json(team)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

// /api/v1/admin/team
router.get('/team/detail',
    async (req, res) => {
        console.log(req.body);
        try {
            const team = await Team.find({}).populate('players');

            if (!team.length) {
                return res.status(400).json({ message: 'Команды еще не добавлены' })
            }

            res.status(200).json(team)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.post('/team', auth, [
        check('name', 'Должно быть минимум 2 буквы').isLength({ min: 2, max: 100 }),
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



            const { name } = req.body;
            const team = await Team.findOne({ name });

            if (team) {
                return res.status(400).json({ message: 'Команда с таким названием уже существует' })
            }

            const newTeam = new Team({ name });
            await newTeam.save();
            res.status(201).json({ message: `Команда "${name} добавлена`, newTeam})

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.put('/team', auth, [
        // check('name', 'Должно быть минимум 2 буквы').isLength({ min: 2, max: 100 }),
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

            const { _id, name, players } = req.body;
            const team = await Team.findOne({ _id  });

            if (!team) {
                return res.status(400).json({ message: 'Команда не найдена' })
            }
            // const playerForAdd = await Player.findOne({ _id: player  });
            // console.log('ddd', player);

            // team.players.push(playerForAdd);
            // team.name = name;

            await team.updateOne(req.body);
            res.status(201).json({ message: `Команда "${name} обновлена`, team })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.delete('/team/:_id', auth,
    async (req, res) => {
        try {
            const { _id } = req.params;
            const team = await Team.findOne({ _id });

            if (!team) {
                return res.status(400).json({ message: 'Команда не найдена', id: _id })
            }

            await team.remove();
            res.status(201).json({ message: `Команда "${_id}" была удалена` })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

module.exports = router;
