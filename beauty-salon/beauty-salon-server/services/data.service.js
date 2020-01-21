const Models = require('../models/models');
const DbService = require('../services/db.service');

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
    static findUserById(from, id){
        if (from === 'db'){
            console.log('try to find ->>>>>>>>>>>>>> id ', id);
            return Models.User.findAll({raw:true, where:{id: +id}})
        }
    }
    static getOrders(from){
        return new Promise( async resolve => {
            if (from === 'db'){
                let orders = {};
                orders.daily = await Models.Daily.findAll({
                    raw: true,
                    attributes: [
                        'id',
                        'time',
                        DbService.literal('(select name from services where services.id=daily_order.service_id) as services'),
                        DbService.literal('(select name from masters where masters.id=daily_order.master_id) as master'),
                        DbService.literal('(select name from dim_order_status where dim_order_status.id=daily_order.status_id) as status')],
                });
                orders.daily = orders.daily.map( o => ({
                    ...o,
                    time: Math.round( o.time / 1000)
                }));
                orders.custom = await Models.Custom.findAll({raw: true,});
                orders.custom = orders.custom.map( o => ({
                    ...o,
                    time: Math.round( o.time / 1000)
                }));
                orders.random = await Models.Random.findAll({raw: true});
                orders.random = orders.random.map( o => ({
                    ...o,
                    time: Math.round( o.time / 1000)
                }));

                return resolve(orders);
            }
        });

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
