const express = require('express');
const Controller = require('../controllers')
const router = express.Router();

router.get('/', Controller.home)
router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.use(function(req,res,next){
    console.log("masoook");
    console.log(req.session);
    next()
})




module.exports = router;