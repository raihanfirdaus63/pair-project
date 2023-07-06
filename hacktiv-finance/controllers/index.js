const { rupiahformatter } = require('../helpers/formatter')
const { User, Profile, Product, HistoryPrice, Order } = require('../models')
const bcrypt = require('bcryptjs')
const sequelize = require('sequelize')
const { Op } = sequelize

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
    static findAllProfiles(req,res){
        const id = req.session.userId
        User.findByPk(+id, {
            include :{
                model: Profile
            }
        })
        .then((data)=>{
            res.render('profile-2', { data, rupiahformatter})
        })
        .catch((err)=>{res.send(err)})
    }
    static getAddProfile(req, res){
        const id =req.session.userId
        User.findByPk(+id, {
            include:{
                model: Profile
            }
        }) 
        .then((data)=>{
            res.render('add-profile', {data} )
        }) 
        .catch((err)=>{
            res.send(err)
        })
    }
    static postAddProfile(req, res){
        const id = req.session.userId
        const {name, birthOfDate, address, phone, payment, UserId} = req.body
        console.log(req.body);
        Profile.create(
            {name, birthOfDate, address, phone, payment, UserId},
            { where : { id }}
            )
        .then(data => {
            res.redirect(`/profile/${id}`)
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
            res.render('edit-profile', { data, rupiahformatter })
        })
        .catch((err)=>{res.send(err)})

    }
    static postEditProfile(req, res) {
        const id = req.session.userId;
        const { name, birthOfDate, address, phone, payment } = req.body;
    
        Profile.update(
            { name, birthOfDate, address, phone, payment },
            { where: { id } }
        )
        .then((data) => {
            res.redirect(`/profile-2/${id}`);
        })
        .catch((err) => {
            res.send(err);
        });
    }
    static getTopup(req,res){
        const id = req.session.userId
        User.findByPk(+id, {
            include :{
                model: Profile
            }
        })
        .then((data)=>{
            res.render('topup-profile', { data , rupiahformatter})
        })
        .catch((err)=>{res.send(err)})
    }
    static postTopup(req,res){
        const id = req.session.userId
        const { balance } = req.body
        Profile.increment(
            { balance: balance },
            { where: { id } }
        )
        .then((data)=>{
            res.redirect(`/profile-2/${id}`)
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    
    static showProducts(req, res){
        const { search } = req.query
        let opt = {
            include: {model: HistoryPrice},
            where: {}
        }
        if (search) {
            opt.where = {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            }
        }
        Product.findAll(opt)
            .then(data => {
                // res.send(data)
                const string = JSON.stringify(data)
                res.render('products', {data, string, rupiahformatter})
            })
            .catch(err => {
                res.send(err)
                // console.log(err);
            })
    }
    static buyStock(req, res){
        const {id} = req.params
        const {userId} = req.session

        let opt = {
        //     include: [{
        //         model: Order, 
        //         where: {id : Order.ProductId}, 
        // }],
        //     where: {id}
        }
        Product.findAll(opt)
            .then(data => {
                // console.log(userId);
                // res.send(data)
                const string = JSON.stringify(data)
                res.render('buy', {data, string, rupiahformatter})
            })
            .catch(err => {
                res.send(err)
                // console.log(err);
            })
    }
}

module.exports = Controller