const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const News = require('../../models/News');
const router = Router();
const fileMiddleware = require('../../middleware/file');
const auth = require('../../middleware/auth');


const checkErrors = [
    check('title', 'Должно быть минимум 2 буквы').isLength({ min: 2, max: 100 }),
    check('textPreview', 'Должно быть от 10 до 256 знаков').isLength({ min: 10, max: 256 }),
    check('text', 'Должно быть от 10 до 2000 знаков').isLength({ min: 10, max: 4000 }),
]

// /api/v1/admin/news
router.get('/news',
    async (req, res) => {
        try {
            const news = await News.find();


            if (!news) {
                return res.status(400).json({ message: 'Новости еще не добавлены' })
            }

            res.status(200).json(news)

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.post('/news', auth, checkErrors,
    async (req, res) => {
        console.log('+', req.body);
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            const { title, textPreview, text } = req.body;
            const news = await News.findOne({ title, textPreview });

            if (news) {
                return res.status(400).json({ message: 'Такая новость уже существует' })
            }

            const newNews = new News({ title, textPreview, text });
            await newNews.save();
            res.status(201).json({ message: `Новость "${title} добавлена`, newNews})

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова news', error: e })
        }
    });

router.put('/news', auth, checkErrors,
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

            const { _id, title, textPreview, text } = req.body;
            const news = await News.findOne({ _id  });

            if (!news) {
                return res.status(400).json({ message: 'Игрок не найден' })
            }

            await news.update({
                title, textPreview, text
            });

            news.title = title;
            news.textPreview = textPreview;
            news.text = text;

            res.status(201).json({ message: `Новость "${title} обновлена`, news })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.delete('/news/:_id', auth,
    async (req, res) => {
        try {
            console.log(req.params);
            const { _id } = req.params;
            const news = await News.findOne({ _id });

            if (!news) {
                return res.status(400).json({ message: 'Новость не найдена', id: _id })
            }

            await news.remove();
            res.status(201).json({ message: `Новость "${_id}" была удалена` })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });

router.put('/newsFile/:_id', auth, fileMiddleware.single('image'),
    async (req, res) => {
        try {
            if (req.file) {
                console.log('+++', req.file.path);
            }

            const { _id } = req.params;
            console.log('ID', _id);

            const news = await News.findOne({ _id  });

            if (!news) {
                return res.status(400).json({ message: 'Новость не найдена' })
            }
            console.log('NEWS', news);
            news.img = req.file.path;

            await news.update(news);
            res.status(201).json({ message: `Новость "${news.title} обновлена`, news })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e })
        }
    });


module.exports = router;
