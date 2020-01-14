const express = require('express');
const router = express.Router();
const cors = require('cors');
const AuthService = require('../../services/auth.service');

const CORSOptions = require('../../config/corsconfig');

router.options('/login', cors(CORSOptions));
router.post('/login',
    async (req, res) => {
        console.log('auth');
        let authRes = await AuthService.login(req.get('Authorization')).catch(e => console.log(e));
        if (authRes.success){
            res.json({ success: true ,  token: authRes.token})
        } else {
            res.json({ success: false , message: 'Unauthorized'})
        }
    });

module.exports = router;
