// livresRoutes.js
const express = require('express');
const livresController = require('../Controllers/livresController');
const router = express.Router();

router.get('/', livresController.getlivres);
router.post('/', livresController.addlivre);
router.delete('/:idlivre', livresController.deletelivre);
router.put('/:idlivre', livresController.updatelivre);

module.exports = router;