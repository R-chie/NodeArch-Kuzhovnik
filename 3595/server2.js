const express = require('express');

const bodyParser = require('body-parser');
const webserver = express();
const path = require('path');
const fs = require('fs');
const statsFN = path.join(__dirname, 'stats.json');
const variants = require('./variants');
const stats = require('./stats');
const port = 8481;
const js2xmlparser = require('js2xmlparser');

webserver.use(express.static(path.join(__dirname, 'public')));
webserver.use(bodyParser.json());
webserver.use(bodyParser.urlencoded({ extended: true }));



webserver.get('/variants', (req, res) => res.send(variants));
webserver.post('/stats', (req, res) => res.send(stats));
webserver.post('/vote', (req, res) => {
    const receivedVoteCode = req.body.vote;
    updateStats(receivedVoteCode);
    res.send(stats)
});
webserver.get('/save' , (req, res) => {
    console.log('save ---');
    try {
        if(req.query.save === 'html'){
            console.log('save HTML');
            res.setHeader("Content-Disposition", "'attachment; filename=\"results.html\"'");
            res.setHeader("Content-Type", "text/html");
            res.send(`<div>results: <br> ${JSON.stringify(stats)}</div>`)
        }
        if(req.query.save === 'json'){
            console.log('save JSON');
            res.setHeader("Content-Disposition", "'attachment; filename=\"results.json\"'");
            res.setHeader("Content-Type", "application/json");
            res.send(stats)
        }
        if(req.query.save === 'xml'){
            console.log('save XML');
            res.setHeader("Content-Disposition", "'attachment; filename=\"results.xml\"'");
            res.setHeader("Content-Type", "text/xml");
            res.send(js2xmlparser.parse( 'results',stats))
        }
    } catch (e) {
        res.status(500).end();
    }

});

const updateStats = (receivedVoteCode) => {
    stats[receivedVoteCode] = +stats[receivedVoteCode] + 1;
    const statsFd = fs.openSync(statsFN, 'w');
    fs.writeSync(statsFd, JSON.stringify( 'results',stats));
    fs.closeSync(statsFd);
};


webserver.listen(port,()=>{
    console.log("web server running on port "+port);
});