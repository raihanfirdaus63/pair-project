const { User, Profile, Product, History } = require('../models')
const bcrypt = require('bcryptjs')
class Controller {
    static home (req,res){
        res.render('home')
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
                    return res.render('profile')
                } else {
                    const error = 'invalid/username'
                    return res.redirect(`/home?error=${error}`)
                }
            }else {
                const error = 'invalid/username'
                return res.redirect(`/home?error=${error}`)
            }
        })
        .catch(err=>{
            res.send(err)
        })
    }
}

module.exports = Controller