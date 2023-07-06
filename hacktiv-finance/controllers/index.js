const { User, Profile, Product, History } = require('../models')

class Controller {
    static home (req,res){
        res.render('home')
    }
}

module.exports = Controller