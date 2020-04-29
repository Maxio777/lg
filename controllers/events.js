const Event = require('../models/Event');
const { validationResult } = require('express-validator');



module.exports.getAll = async (req, res) => {
    try {
        const event = await Event.find();

        if (!event) {
            return res.status(400).json({ message: 'События еще не добавлены' })
        }
        res.status(200).json(event)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
    }
};

module.exports.add = async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json({ message: `Событие было добавлено`, ev: newEvent._id })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
    }
};

module.exports.update = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные'
            })
        }

        const { _id } = req.body;
        const event = await Event.findOne({ _id  });

        if (!event) {
            return res.status(400).json({ message: 'Событие не найдено' })
        }

        const updated = await event.update(req.body);
        res.status(201).json({ message: `Событие было обновлено`, ev: updated })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
    }
};

module.exports.remove = async (req, res) => {
    try {
        const { _id } = req.params;
        const event = await Event.findOne({ _id });

        if (!event) {
            return res.status(400).json({ message: `Событие по id: ${_id} не найдено: ` })
        }

        await event.remove();
        res.status(201).json({ message: `Событие удалено` })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
    }
};
