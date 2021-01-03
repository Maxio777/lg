const { Router } = require('express');
const Tournament = require('../models/Tournament');
const {FORMATS_TOURNAMENTS} = require("../constants/constants")
const router = Router();


// /api/v1/settings
router.get('/settings',
    async (req, res) => {
        try {
            const currentTournament = await Tournament.find({ current: true });

            if (!currentTournament) {
                return res.status(400).json({ message: 'Текущий турнир не найден' })
            }

            const settings = {}

            settings.currentTournamentId = currentTournament[0]._id;
            settings.formats = FORMATS_TOURNAMENTS;
            res.status(200).json(settings)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });



module.exports = router;
