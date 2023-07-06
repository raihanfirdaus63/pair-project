const express = require('express');
const Controller = require('../controllers')
const router = express.Router();

router.get('/', Controller.home)
router.post('/', Controller.register)



module.exports = router;