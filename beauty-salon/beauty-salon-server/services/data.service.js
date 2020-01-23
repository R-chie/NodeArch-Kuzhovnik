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
                console.log(orders.daily)
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
    static updateOrdersStatus(orders, code){
        return new Promise(async (resolve, reject) => {
            let daily  = orders.filter( o => o.type === 'daily');
            let custom = orders.filter( o => o.type === 'custom');
            let random = orders.filter( o => o.type === 'random');
            console.log('selected code ->>>>>>>>>>>', code);
            daily.forEach( async (order, index) => {
                await Models.Daily.update({
                    status_id: DbService.literal(`(select id from dim_order_status where dim_order_status.code='${code}')`)
                }, {where: {id : daily[index].id}}).catch(e => reject(e))
            });
            custom.forEach( async (order, index) => {
                await Models.Custom.update({
                    status_id: DbService.literal(`(select id from dim_order_status where dim_order_status.code='${code}')`)
                }, {where: {id : daily[index].id}}).catch(e => reject(e))
            });
            random.forEach( async (order, index) => {
                await Models.Random.update({
                    status_id: DbService.literal(`(select id from dim_order_status where dim_order_status.code='${code}')`)
                }, {where: {id : daily[index].id}}).catch(e => reject(e))
            });
            resolve({success: true})
        })
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

    static async getPageByName(pagename){
        return new Promise( async (resolve, reject) => {
            let p = await Models.Page.findOne({where: {page_name: pagename}}).catch(e => reject(e))
            return resolve(p)
        })
    }

    static async getServices(){
        return new Promise( async (resolve, reject) => {
            let s = Models.Service.findAll({
            raw: true,
            attributes: [
                'id',
                'name',
                'code',
                'desc',
                'price',
                DbService.literal('(select name from masters where masters.id=service.master_id) as master'),
                DbService.literal('(select page_name from pages where pages.id=service.page_id) as page_name'),
            ]
            });
            return resolve(s);
        })
    }

    static getPages(){
        return new Promise( async (resolve, reject) => {
            let p = Models.Page.findAll({raw: true}).catch(e => reject(e));
            return resolve(p)
        })
    }

    static updatePage(pageObj){
            return Models.Page.update({...pageObj}, {where: {id: pageObj.id}})
    }

    static createPage(pageObj){
        return Models.Page.create({
            page_name: pageObj.page_name.indexOf('/') === 0 ? pageObj.page_name : '/' + pageObj.page_name,
            page_title: pageObj.page_title,
            page_md: pageObj.page_md,
            page_html: pageObj.page_html,
        })
    }

    static deletePage(pageId){
        return Models.Page.destroy({
            where : {
                id: pageId
            }
        })
    }
}

module.exports = DataService;
