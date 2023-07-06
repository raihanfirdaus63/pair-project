const express = require('express');
const Controller = require('../controllers')
const router = express.Router();

router.get('/', Controller.home)
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.use(function(req,res,next){
    // console.log(req.session);
    if (!req.session.userId){
        const error = 'Please login first'
        res.redirect(`/?error=${error}`)
    } else {
        next()
    }

})

router.get('/profile/:id', Controller.findAllProfile)
router.get('/add-profile/:id', Controller.getAddProfile)
router.get('/profile/:id/edit', Controller.getEditProfile)
router.post('/profile', Controller.postAddProfile)
router.get('/products', Controller.showProducts)








module.exports = router;