const Models = require('../models/models');

class DataService {
    constructor(){}
    static getUsers(from){
            if (from === 'db'){
                return Models.User.findAll({raw:true})
            }
    };
}

module.exports = DataService;
