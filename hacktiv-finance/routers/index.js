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
router.get('/profile-2/:id', Controller.findAllProfiles)
router.get('/add-profile/:id', Controller.getAddProfile)
router.post('/add-profile/:id', Controller.postAddProfile)
router.get('/profile/:id/edit', Controller.getEditProfile)
router.post('/profile/:id/edit', Controller.postEditProfile)
router.get('/profile-2/:id/topup', Controller.getTopup)
router.post('/profile-2/:id/topup', Controller.postTopup)
router.get('/products', Controller.showProducts)








module.exports = router;