const { Router } = require('express');
const router = Router();
const upload = require('../../middleware/file');
const auth = require('../../middleware/auth');

const ITEMS = {
    news: require('../../models/News'),
    player: require('../../models/Player'),
    manager: require('../../models/Manager'),
    referee: require('../../models/Referee'),
    team: require('../../models/Team')
};

router.put('/upload/:kind/:_id/', auth, upload.single('image'),
    async (req, res) => {
        try {
            if (req.file) {
                const { kind, _id } = req.params;
                const updateItem = await ITEMS[kind].findOne({ _id });

                if (!updateItem) {
                    return res.status(400).json({
                        message: 'Запись не найдена'
                    })
                }

                await updateItem.update({ img: req.file.path});
                return res.status(201).json({
                    message: 'Фотография добавлена'
                })
            }
            return res.status(400).json({
                message: 'Файл не определен'
            })

        } catch (e) {
            res.status(500).json({
                message: 'Что-то пошло не так, попробуйте снова',
                error: e
            })
        }
    });

module.exports = router;
