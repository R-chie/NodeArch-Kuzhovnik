const Models = require('../models/models');

class DataService {
    constructor(){}
    static getUsers(from){
            if (from === 'db'){
                return Models.User.findAll({raw:true})
            }
    };
    static findUser(from, incomingLogin){
        if (from === 'db'){
            return Models.User.findAll({raw:true, where:{login: incomingLogin}})
        }
    }
    static async updateToken(from, token, tokenData){
        let data = {
            exp: tokenData.payload.exp,
            kid: tokenData.payload.kid,
            jti: tokenData.payload.jti
        };
        if (from === 'db'){
            let t = await Models.Token.findOne({where: {id: data.jti}});
            if (t){
                return Models.Token.update({
                    id: data.jti,
                    jwt_key_id: data.kid,
                    jwt_exp: data.exp,
                    jwt: token
                }, {where: {id : data.jti}})
            } else {
                return Models.Token.create({
                    id: data.jti,
                    jwt_key_id: data.kid,
                    jwt_exp: data.exp,
                    jwt: token
                })
            }

        }
    }
}

module.exports = DataService;
