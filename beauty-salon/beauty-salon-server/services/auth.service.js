const Base64 = require('js-base64').Base64;
const crypto = require('crypto');
const DataService = require('../services/data.service');
const JwtService = require('../services/jwt.service');

class AuthService {
    static async login(authData){
        return new Promise( async resolve => {
            let userData = await this._decodeUserCredentials(authData);
            let user = await DataService.findUser('db', userData.username).catch(e => console.log(e));
            if (user.length !== 0){
                // compare passwords
                let compareResult = await this._comparePasswords(userData.password, user[0].password);
                if (compareResult.success){
                    let token = await JwtService.generateJwt(user[0]);
                    let decoded = await JwtService.decodeToken(token);
                    let result  = await JwtService.storeToken(token, decoded);
                    return resolve({success: true, token})
                } else return resolve({success: false})
            } else {
                return resolve({success: false})
            }
        });
    }

    static _comparePasswords(password, currentPassword){
        return new Promise( resolve => {
            console.log('compare...');
            let hash = crypto.createHash('sha256');
            let update = hash.update(password);
            let pass = update.digest('hex');
            console.log(pass);
            console.log(currentPassword);
            if (pass === currentPassword){
                console.log('pass match');
                return resolve({success: true})
            }
            return resolve({success: false})
        })
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
