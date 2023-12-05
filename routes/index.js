const express = require('express');
const appController = require('../controllers/AppController');

const router = express.Router();
router.get('/status', appController.getStatus);
router.get('/stat', appController.getStats);

module.exports = router;
