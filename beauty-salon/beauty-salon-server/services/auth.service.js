const Base64 = require('js-base64').Base64;
const DataService = require('../services/data.service');
const JwtService = require('../services/jwt.service');

class AuthService {
    static async login(authData){
        let userData = await this._decodeUserCredentials(authData);
        let user = await DataService.findUser('db', userData.username).catch(e => console.log(e));
        if (user.length !== 0){
            let token = await JwtService.generateJwt(user[0]);
            let decoded = await JwtService.decodeToken(token);
            let result  = await JwtService.storeToken(token, decoded);
            return {success: true, token}
        } else {
            return {success: false}
        }

    }

    static _decodeUserCredentials(baseAuthHeader){
        return new Promise((resolve, reject) => {
            let usernameRe = /^\w+/;
            let data = baseAuthHeader.slice(6);
            let decoded = Base64.decode(data);
            if (data === undefined || data === ''){
                reject('User credentials not valid')
            } else {
                let userData = {
                    username: usernameRe.exec(decoded)[0],
                    password: /(?<=:)\w+/.exec(decoded)[0]
                };
                if (!userData.username || !userData.password) {
                    resolve(null);
                } else {
                    resolve(userData);
                }
            }
        });
    }
}

module.exports = AuthService;
