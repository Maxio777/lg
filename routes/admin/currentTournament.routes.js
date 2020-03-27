const { Router } = require('express');
const Game = require('../../models/Game');
const News = require('../../models/News');
const router = Router();
const Event = require('../../models/Event');
const Player = require('../../models/Player');


router.get('/current-tournament/:id',
    async (req, res) => {
        const { id } = req.params;
        try {
            const news = await News.find();
            const players = await Player.find();

            const games = await Game.find({ tournament: id })
                .populate('tournament')
                .populate('home')
                .populate('homePlayers')
                .populate('guestPlayers')
                .populate('homeManagers')
                .populate('guestManagers') 
                .populate('referees')
                .populate('events')
                .populate('guest')
                .populate({ path: 'guest',  populate: ('players') } )
                .populate({ path: 'home',  populate: ('players') } )
                .populate({ path: 'events',  populate: (['owner', 'assistant']) } );
            const event = await Event.find().populate('owner');
            // let players = [];
            // games.forEach(game => players.push(...game.home.players, ...game.guest.players, event));
            // const setPlayers = new Set(players);

            if (!games.length) {
                return res.status(200).json([]);
            }

            res.status(200).json([games, players, news]);

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }

    });



module.exports = router;
