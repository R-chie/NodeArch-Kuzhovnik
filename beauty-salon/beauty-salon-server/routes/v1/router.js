const express = require('express');
const router = express.Router();
const cors = require('cors');
const path = require('path');
const AuthService = require('../../services/auth.service');
const DataService = require('../../services/data.service');
const passport = require('passport');
const CORSOptions = require('../../config/corsconfig');
const logFN = path.join(__dirname, '_server.log');
const {logLineAsync} = require('../../utils');

router.options('/login', cors(CORSOptions));
router.post('/login',
    async (req, res) => {
    try {
        logLineAsync(logFN,"auth...");
        let authRes = await AuthService.login(req.get('Authorization')).catch(e => console.log(e));
        if (authRes.success){
            res.json({ success: true ,  token: authRes.token})
        } else {
            res.json({ success: false , message: 'Unauthorized'})
        }
    } catch (e) {
        logLineAsync(logFN,e);
        res.status(500).end()
    }
});
router.options('/orders', cors(CORSOptions));
router.get('/orders',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            console.log('get orders');
            let orders = await DataService.getOrders('db');
            res.json(orders)
        } catch (e) {
            logLineAsync(logFN,e);
            res.status(500).end()
        }
    }
    );

module.exports = router;
