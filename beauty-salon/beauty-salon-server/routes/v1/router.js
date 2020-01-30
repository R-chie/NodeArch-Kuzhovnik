const express = require('express');
const router = express.Router();
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const AuthService = require('../../services/auth.service');
const DataService = require('../../services/data.service');
const passport = require('passport');
const CORSOptions = require('../../config/corsconfig');
const logFN = path.join(__dirname, '_server.log');
const {logLineAsync, sitemap, processingBg} = require('../../utils');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/images'));
    },
    filename: function (req, file, cb) {
        //let date = new Date(Date.now()).toLocaleString().slice(0,9);
        console.log(file.mimetype);
        cb(null, `${file.fieldname}.png`);
    },
});
const upload = multer( { storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/png') {
            return cb(null, false);
        }
        return cb(null, true)
    } } );

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

router.options('/uploadBg', cors(CORSOptions));
router.post('/uploadBg',
    upload.single('beauty_salon_bg'),
    async (req, res) => {
        try {
            logLineAsync(logFN,"upload bg...");
            processingBg(path.resolve('./public/images/beauty_salon_bg.png'));
            res.json({success: true})
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
            logLineAsync(logFN,"get orders...");
            let orders = await DataService.getOrders('db');
            res.json(orders)
        } catch (e) {
            logLineAsync(logFN,e);
            res.status(500).end()
        }
});
router.options('/orders/update', cors(CORSOptions));
router.post('/orders/update',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            logLineAsync(logFN,"update orders status...");
            req.body.arr.forEach( (order, index) => {
                console.log(order.type);
            });
            let update = await DataService.updateOrdersStatus(req.body.arr, req.body.code).catch(e => console.log(e));
            if (update){
                res.json({success: true})
            }
        } catch (e) {
            logLineAsync(logFN,e);
            res.status(500).end()
        }
    });
router.options('/pages', cors(CORSOptions));
router.get('/pages',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            logLineAsync(logFN,"get service pages...");
            let pages = await DataService.getPages().catch(e => console.log(e));
            res.json(pages);
        } catch (e) {
            logLineAsync(logFN,e);
            res.status(500).end()
        }
    });
router.options('/pages/update', cors(CORSOptions));
router.post('/pages/update', passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            logLineAsync(logFN,`update page...${req.body.page.page_name}`);
            await DataService.updatePage(req.body.page).catch(e => console.log(e));
            sitemap();
            res.json({success: true})
        } catch (e) {
            logLineAsync(logFN,e);
            res.status(500).end()
        }
    });

router.options('/pages/create', cors(CORSOptions));
router.post('/pages/create', passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            logLineAsync(logFN,`create page...${req.body.page.page_name}`);
            await DataService.createPage(req.body.page).catch(e => console.log(e));
            res.json({success: true})
        } catch (e) {
            logLineAsync(logFN,e);
            res.status(500).end()
        }
    });

router.options('/pages/delete', cors(CORSOptions));
router.delete('/pages/delete', passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            logLineAsync(logFN,`delete page...${req.body.pageId}`);
            await DataService.deletePage(req.body.pageId).catch(e => console.log(e));
            res.json({success: true})
        } catch (e) {
            logLineAsync(logFN,e);
            res.status(500).end()
        }
    });

module.exports = router;
