const express = require('express');
const router = express.Router();
const cors = require('cors');
const DataService = require('../../services/data.service');

const CORSOptions = require('../../config/corsconfig');

router.options('/login', cors(CORSOptions));
router.post('/login',
    async (req, res) => {
        console.log('auth');
        let users = await DataService.getUsers('db').catch(err=>console.log(err));
        //let tokens = await Models.Token.findAll({raw:true}).catch(err=>console.log(err));
        //let daily = await Models.Daily.findAll({raw:true}).catch(err=>console.log(err));

        res.json({ success: true ,  user: users[0]})
    });

module.exports = router;
