const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const Game = require('../../models/Game');
const router = Router();
const auth = require('../../middleware/auth');


// /api/v1/admin/game
router.get('/game',
    async (req, res) => {
        console.log(req.body);
        try {
            const game = await Game.find({})
                .populate('tournament')
                .populate('home')
                .populate('homePlayers')
                .populate('guestPlayers')
                .populate('homeManagers')
                .populate('guestManagers')
                .populate('referees')
                .populate('events')
                .populate('guest')
                .populate({path: 'guest', populate: ('players')})
                .populate({path: 'home', populate: ('players')})
                .populate({path: 'events', populate: (['owner', 'assistant'])});

            if (!game.length) {
                return res.status(200).json([])
            }

            res.status(200).json(game)

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова', error: e})
        }
    });

// /api/v1/admin/game
router.get('/game/:_id',
    async (req, res) => {
        console.log(req.body);
        try {
            const {_id} = req.params;
            const game = await Game.findOne({_id})
                .populate('tournament')
                .populate('home')
                .populate('homePlayers')
                .populate('guestPlayers')
                .populate('homeManagers')
                .populate('guestManagers')
                .populate('referees')
                .populate('events')
                .populate('guest')
                .populate({path: 'guest', populate: (['players', 'managers'])})
                .populate({path: 'home', populate: (['players', 'managers'])})
                .populate({path: 'events', populate: (['owner', 'assistant'])});

            if (game) {
                return res.status(200).json(game)
            }
            return res.status(400).json({message: 'Игра не найдена', error: e})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова', error: e})
        }
    });

router.post('/game', auth, [
        // check('name', 'Должно быть минимум 2 буквы').isLength({ min: 2, max: 100 }),
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


            const {tournament, home, guest} = req.body;
            const game = await Game.findOne({tournament, home, guest});

            if (game) {
                return res.status(400).json({message: 'Игра уже уществует'})
            }
            console.log('test');
            const newGame = new Game(req.body);
            await newGame.save();
            res.status(201).json({message: `Игра успешно добавлена`, newGame})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова', error: e})
        }
    });

router.put('/game/:_id', auth, [],
    async (req, res) => {
        try {
            console.log(req.params);
            const _id = req.params._id;
            const game = await Game.findOneAndUpdate(
                {_id},
                {'$set': req.body},
                {new: true}
            ).populate('tournament')
                .populate('home')
                .populate('homePlayers')
                .populate('guestPlayers')
                .populate('homeManagers')
                .populate('guestManagers')
                .populate('referees')
                .populate('events')
                .populate('guest')
                .populate({path: 'guest', populate: (['players', 'managers'])})
                .populate({path: 'home', populate: (['players', 'managers'])})
                .populate({path: 'events', populate: (['owner', 'assistant'])});

            res.status(201).json({message: `Игра "${_id} обновлена`, game})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова', error: e})
        }
    });

router.put('/game', auth, [
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

            const {_id} = req.body;
            const game = await Game.findOne({_id});

            if (!game) {
                return res.status(400).json({message: 'Игра не найдена'})
            }
            console.log('test');

            await game.update(req.body);
            res.status(201).json({message: `Игра "${_id} обновлена`, game})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова', error: e})
        }
    });

router.delete('/game/:_id', auth,
    async (req, res) => {
        try {
            const {_id} = req.params;
            const game = await Game.findOne({_id});

            if (!game) {
                return res.status(400).json({message: 'Игра не найдена', id: _id})
            }

            await game.remove();
            res.status(201).json({message: `Игра "${_id}" была удалена`})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова', error: e})
        }
    });

module.exports = router;
