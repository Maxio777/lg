const Tag = require('../models/Tag')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = async (req, res) => {
	try {
		const tags = await Tag.find({},'-__v');

		if (!tags.length) {
			return res.status(400).json({ message: 'Теги еще не добавлены' })
		}
		res.status(200).json(tags)

	} catch (e) {
		errorHandler(res, e)
	}
};

module.exports.add = async (req, res) => {
	try {
		const candidate = await Tag.findOne({name: req.body.name})
		if (candidate) {
			return res.status(400).json({message: 'Тег с таким названием уже существует!'})
		}
		const tag = new Tag(req.body);
		await tag.save();
		res.status(201).json({ message: `Тег был создан`, tag })

	} catch (e) {
		errorHandler(res, e)
	}
};

module.exports.update = async (req, res) => {
	try {


		const { _id } = req.body;
		const tag = await Tag.findOne({ _id  });

		if (!tag) {
			return res.status(400).json({ message: 'Тег не найдено' })
		}

		const updated = await tag.update(req.body);
		res.status(201).json({ message: `Тег был обновлен`, updated })

	} catch (e) {
		errorHandler(res, e)
	}
};

module.exports.remove = async (req, res) => {
	try {
		const { _id } = req.params;
		const tag = await Tag.findOne({ _id });

		if (!tag) {
			return res.status(400).json({ message: `Тег по id: ${_id} не найден: ` })
		}

		await tag.remove();
		res.status(201).json({ message: `Тег удален` })

	} catch (e) {
		errorHandler(res, e)
	}
};
