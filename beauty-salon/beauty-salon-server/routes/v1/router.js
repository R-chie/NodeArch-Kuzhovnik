const express = require('express');
const router = express.Router();
const cors = require('cors');
const CORSOptions = require('../../config/corsconfig');

router.options('/login', cors(CORSOptions));
router.post('/login',
    async (req, res) => {
        console.log('auth');
        res.json({ success: true , token: 'token'})
    });

module.exports = router;