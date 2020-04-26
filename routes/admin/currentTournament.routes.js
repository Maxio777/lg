const { Router } = require('express');
const Game = require('../../models/Game');
const News = require('../../models/News');
const Tournament = require('../../models/Tournament');
const router = Router();
const Player = require('../../models/Player');
const Team = require('../../models/Team');
const PreparePlayers = require('../../middleware/preparePlayers');
const Table = require('../../middleware/createTable');
const cache = require('../../middleware/cache');


router.get('/current-tournament', cache(60),
    async (req, res) => {

        try {

            const currentTournament = await Tournament.findOne({ current: true });
            const { id } = currentTournament;

            if (!currentTournament) {
                return res.status(400).json({ message: 'Текущий турнир не найден' })
            }

            const news = await News.find();
            let players = await Player.find();

            let games = await Game.find({ tournament: id })
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

            let teams = await Team.find({})
                .populate('managers');


            players = await PreparePlayers.addFieldsForPlayers(players, games);
            const table = await Table.createTables(games);

            res.status(200).json([games, players, news, currentTournament, table, teams]);

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }

    });


module.exports = router;
