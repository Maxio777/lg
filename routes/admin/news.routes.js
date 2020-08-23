const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const News = require('../../models/News');
const Tag = require('../../models/Tag');
const router = Router();
const fileMiddleware = require('../../middleware/file');
const auth = require('../../middleware/auth');


const checkErrors = [
    check('title', 'Должно быть минимум 2 буквы').isLength({ min: 2, max: 100 }),
    check('textPreview', 'Должно быть от 10 до 256 знаков').isLength({ min: 10, max: 256 }),
    check('text', 'Должно быть от 10 до 10000 знаков').isLength({ min: 10, max: 10000 }),
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

router.post('/news', auth, fileMiddleware.single('image'), checkErrors,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            const { title, textPreview, text } = req.body;
            const news = await News.findOne({ title, textPreview, text });

            if (news) {
                return res.status(400).json({ message: 'Такая новость уже существует' })
            }

            const newNews = new News({ title, textPreview, text, img: req.file ? req.file.path : '' });
            await newNews.save();
            res.status(201).json({ message: `Новость "${title} добавлена`, newNews})

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова news', error: e })
        }
    });

router.put('/news/:_id', auth, fileMiddleware.single('image'), checkErrors,
     async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            const _id = req.params._id

            let { title, textPreview, text, tags } = req.body;
            tags = JSON.parse(tags)
            const news = await News.findOne({ _id });

            // tags.forEach((t, index) => {
            //     if ( typeof t === 'string') {
            //         const newTag = new Tag(t)
            //         newTag.save()
            //         tags[index] = newTag
            //     }
            // })

            if (!news) {
                return res.status(400).json({ message: 'Новость не найдена' })
            }
            const updated = {
                title, textPreview, text, tags
            }

            if (req.file) {
                updated.img = req.file.path
            }

            const updatedNews = await News.findOneAndUpdate(
                { _id },
                { $set: updated },
                { new: true }
            );

            res.status(201).json({ message: `Новость "${updated.title} обновлена`, news: updatedNews })

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


module.exports = router;
