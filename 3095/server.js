const express = require('express');

const bodyParser = require('body-parser');
const webserver = express();
const path = require('path');
const fs = require('fs');
const logFN = path.join(__dirname, '_server.txt');

const variants = require('./variants');
const port = 8480;

let stats = {
    'yes': 0,
    'no' : 0,
    'dunno' : 0,
};


webserver.use(bodyParser.json());
webserver.use(bodyParser.urlencoded({ extended: true }));

webserver.get('/variants', (req, res) => {
    console.log(`variants called, req.originalUrl=${req.originalUrl}`);
    res.send(createHtml());
});
webserver.get('/stats', (req, res) => {
    console.log(`stats called, req.originalUrl=${req.originalUrl}`);
    res.send(stats);
});
webserver.post('/vote', (req, res) => {
    console.log(`vote called, req.originalUrl=${req.originalUrl}`);
    const receivedVote = req.body.vote;
    let update = variants.find( variant => variant.id === receivedVote);
    stats[update.code] = +stats[update.code] + 1;
    console.log(stats[update.code] );
    res.send({[update.code] : stats[update.code], id: update.id});

    const logFd = fs.openSync(logFN, 'w');
    fs.writeSync(logFd, JSON.stringify(stats));
    fs.closeSync(logFd);
});

const createHtml = () => {
    let viewVariants = variants.map( variant => {
        return `<input type="button" id="${variant.id}" value="${variant.text}" onclick="vote(this.id)">`;
    }).join('');
    let viewStats = '';
    let read = readFileSync(logFN);
    let parsed = JSON.parse(read);
    for (let p in parsed) {
        viewStats += `<li class="li">${p}: ${parsed[p]}</li>`
    }
    return `<div>
            <h2>Варианты ответов</h2>
            ${viewVariants}
            <h2>Статистика ответов</h2>
            <ul>${viewStats}</ul>
        </div>
     <script>
     function vote(id){
         fetch('/vote', {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({vote: id})})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let field = Object.keys(data)[0];
                document.querySelectorAll('li')[+data.id - 1].innerText = field + ': ' + data[field];
            })
     }</script>`
     };

function readFileSync(filePath)
{
    var fd = fs.openSync(filePath, 'r');

    var content = '';

    var buffer = new Buffer(10);

    buffer.fill(0);

    var readCount = fs.readSync(fd, buffer, null, 10);

    while(readCount > 0)
    {
        console.log("Read " + readCount + " bytes.");

        content += buffer.toString().substr(0, readCount);

        readCount = fs.readSync(fd, buffer, null, 10);
    }

    fs.closeSync(fd);

    console.log("File content : " + content);
    return content;
}


webserver.listen(port,()=>{
    console.log("web server running on port "+port);
});