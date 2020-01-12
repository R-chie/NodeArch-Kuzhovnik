const express = require('express');
const router = express.Router();
const cors = require('cors');

const Sequelize = require("sequelize");
const sequelize = new Sequelize('beauty_salon_site', 'root', '1234', {
    dialect: "mysql",
    host: "localhost",
    port: "3306",
});
/*const sequelize = new Sequelize('mysql://root:1234@178.172.195.18/beauty_salon_site');*/
const CORSOptions = require('../../config/corsconfig');

router.options('/login', cors(CORSOptions));
router.post('/login',
    async (req, res) => {
        console.log('auth');
        let qr = await sequelize.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        console.log(qr)
        res.json({ success: true , token: 'token'})
    });

module.exports = router;