const { Router } = require('express');
const auth = require('../../middleware/auth');
const router = Router();
const controller = require('../../controllers/events')


// /api/v1/admin/event
router.get('/event/', controller.getAll);
router.post('/event', auth, controller.add);
router.put('/event', auth, controller.update);
router.delete('/event/:_id', auth, controller.remove);

module.exports = router;
