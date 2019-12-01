const express = require('express');

const bodyParser = require('body-parser');
const webserver = express();
const path = require('path');
const fs = require('fs');
const statsFN = path.join(__dirname, 'stats.json');
const variants = require('./variants');
const stats = require('./stats');
const port = 8480;

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

const updateStats = (receivedVoteCode) => {
    stats[receivedVoteCode] = +stats[receivedVoteCode] + 1;
    const statsFd = fs.openSync(statsFN, 'w');
    fs.writeSync(statsFd, JSON.stringify(stats));
    fs.closeSync(statsFd);
};


webserver.listen(port,()=>{
    console.log("web server running on port "+port);
});