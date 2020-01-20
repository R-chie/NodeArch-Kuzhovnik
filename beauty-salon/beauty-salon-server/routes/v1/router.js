const express = require('express');
const router = express.Router();
const cors = require('cors');
const AuthService = require('../../services/auth.service');
const DataService = require('../../services/data.service');
const passport = require('passport');
const CORSOptions = require('../../config/corsconfig');

router.options('/login', cors(CORSOptions));
router.post('/login',
    async (req, res) => {
    try {
        console.log('auth');
        let authRes = await AuthService.login(req.get('Authorization')).catch(e => console.log(e));
        if (authRes.success){
            res.json({ success: true ,  token: authRes.token})
        } else {
            res.json({ success: false , message: 'Unauthorized'})
        }
    } catch (e) {
        res.status(502).end()
    }
});
router.get('/orders',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            console.log('get orders');
            let orders = await DataService.getOrders('db');
            res.json({orders})
        } catch (e) {
            res.status(502).end()
        }
    }
    );

module.exports = router;
