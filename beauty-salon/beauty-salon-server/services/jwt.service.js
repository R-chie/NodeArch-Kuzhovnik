const { sign, decode, verify } = require('jsonwebtoken');
const { ExtractJwt, Strategy } = require('passport-jwt');
const authconfig = require('../config/authconfig');
const DataService = require('../services/data.service');
const passportOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: authconfig.AUTH_SECURE_KEY,
    issuer: authconfig.TOKEN_ISSUER,
};

class JwtService {
    constructor(){}

    static createStrategy(){
        return new Strategy(passportOpts, async (payload, done) => {
            /* verify error callback*/
            let user = await DataService.findUserById('db', payload.jti);
            console.log(user);
            if (user.length !== 0){
                done(null, user[0]);
            } else {
                done(new Error('User not found'), null)
            }
        })
    }

    static extractJwtFromHeader(header){
        return new Promise(async resolve => {
            resolve(header.slice(7))
        })
    }

    static storeToken(token, decoded){
        return new Promise(async (resolve, reject) => {
            let res = await DataService.updateToken('db', token, decoded).catch(e => console.log(e));
            return resolve(res);
        })
    };

    static decodeToken(token){
        return new Promise((resolve, reject) => {
            resolve(decode(token,{complete: true}))
        });
    }

    static async generateJwt(user){
        return await sign(
            {
                jti: user.id,
                iss: authconfig.TOKEN_ISSUER,
                kid: authconfig.AUTH_SECURE_KEY_ID,
            },
            authconfig.AUTH_SECURE_KEY,
            {
                algorithm: authconfig.TOKEN_ENC_ALGORITHM,
                expiresIn: authconfig.TOKEN_EXPIRES,
            });
    }

}

module.exports = JwtService;
