const { User, Profile, Product, History } = require('../models')

class Controller {
    static home (req,res){
        res.render('home')
    }
    static register(req,res){
        const { userName, email, password } = req.body
        console.log(req.body);
        User.create({ userName, email, password })
        .then((data)=>{
            res.send(res.render('home'))
        })
        .catch((err)=>{
            console.log(err);
            res.send(err)
        })
    }
}

module.exports = Controller