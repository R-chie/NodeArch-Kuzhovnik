var express = require('express');
var router = express.Router();
const { createPageHeader, createMainBody } = require('../utils');
const querystring = require('querystring');

/* GET home page. */
router.get('/*', async function(req, res, next) {
    const originalUrlDecoded = querystring.unescape(req.originalUrl);
    console.log(originalUrlDecoded);
    let idx = originalUrlDecoded.lastIndexOf('/');
    let pageObj = await createPageHeader(originalUrlDecoded.slice(idx)).catch(e => console.log(e));
    let body;
    if (pageObj){
        if (pageObj.page_name === '/main'){
            body = await createMainBody().catch(e => console.log(e));
        } else {
            body = pageObj.page_html;
        }
    }
    if (pageObj){
        res.render('index', {
            title: pageObj.page_title,
            page_md: pageObj.page_md,
            page_mk: pageObj.page_mk,
            body
      });
    } else {
      res.sendStatus(404).end()
    }

});

module.exports = router;
