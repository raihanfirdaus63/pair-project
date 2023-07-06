const { User, Profile, Product, HistoryPrice, Order } = require('../models')
const bcrypt = require('bcryptjs')
class Controller {
    static home (req,res){
        const {error} = req.query 
        res.render('home', { error })
    }
    static register(req,res){
        const { userName, email, password } = req.body
        // console.log(req.body);
        User.create({ userName, email, password })
        .then((data)=>{
            res.redirect('/')
        })
        .catch((err)=>{
            // console.log(err);
            res.send(err)
        })
    }
    static login(req,res){
        const { userName, password} = req.body
        User.findOne({
            where : {
                userName
            }
        })
        .then(user=>{
            // console.log(user);
            if(user){
                const isValidPassword = bcrypt.compareSync(password, user.password)
                if (isValidPassword) {
                    req.session.userId = user.id

                    return res.redirect(`/profile/${user.id}`)
                } else {
                    const error = 'invalid username/password'
                    return res.redirect(`/?error=${error}`)
                }
            }else {
                const error = 'invalid username/password'
                return res.redirect(`/?error=${error}`)
            }
        })
        .catch(err=>{
            res.send(err)
        })
    }
    static findAllProfile(req,res){
        const id = req.session.userId
        User.findByPk(+id, {
            include :{
                model: Profile
            }
        })
        .then((data)=>{
            res.render('profile', { data })
        })
        .catch((err)=>{res.send(err)})

    }
    static getAddProfile(req, res){
        const {error} = req.query
        res.render('add', {error})
    }
    static postAddProfile(req, res){
        const {name, birthOfDate, address, phone, payment} = req.body
        Profile.create({name, birthOfDate, address, phone, payment})
        .then(data => {
            res.redirect('/')
        })
        .catch(err => {
            if (err.name === "SequelizeValidationError") {
                const errs = err.errors.map(el => el.message)
                res.redirect(`/profile?error=${errs}`)
            } else {
                res.send(err)
            }
        })
    }
    static getEditProfile(req,res){
        const id = req.session.userId
        User.findByPk(+id, {
            include :{
                model: Profile
            }
        })
        .then((data)=>{
            res.render('edit-profile', { data })
        })
        .catch((err)=>{res.send(err)})

    }
    static showProducts(req, res){
        let opt = {
            include: HistoryPrice
        }
        Product.findAll(opt)
            .then(data => {
                res.send({data})
                res.render('products', {data})
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = Controller