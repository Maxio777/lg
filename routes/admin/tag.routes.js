const { Router } = require('express');
const router = Router();
const auth = require('../../middleware/auth');
const controller = require('../../controllers/tag')

// /api/v1/admin/event
router.get('/tag', controller.getAll);
router.post('/tag', auth, controller.add);
router.put('/tag', auth, controller.update);
router.delete('/tag/:_id', auth, controller.remove);

module.exports = router;
