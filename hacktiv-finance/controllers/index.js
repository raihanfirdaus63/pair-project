const { User, Profile, Product, History } = require('../models')
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
            res.render('home')
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
            if(user){
                const isValidPassword = bcrypt.compareSync(password, user.password)
                if (isValidPassword) {
                    req.session.userId = user.id

                    return res.render('home-konten')
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
}

module.exports = Controller