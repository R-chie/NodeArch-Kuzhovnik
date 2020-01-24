const fs = require('fs');
const os = require('os');
const DataService = require('./services/data.service');

function logLineAsync(logFilePath,logLine) {

    return new Promise( (resolve,reject) => {

        const logDT=new Date();
        let time=logDT.toLocaleDateString()+" "+logDT.toLocaleTimeString();
        let fullLogLine=time+" "+logLine;

        console.log(fullLogLine); // выводим сообщение в консоль

        fs.open(logFilePath, 'a+', (err,logFd) => {
            if ( err )
                reject(err);
            else
                fs.write(logFd, fullLogLine + os.EOL, (err) => {
                    if ( err )
                        reject(err);
                    else
                        fs.close(logFd, (err) =>{
                            if ( err )
                                reject(err);
                            else
                                resolve();
                        });
                });

        });

    } );
}

function createPageHeader(page){
    return new Promise( async (resolve, reject) => {
        let storedPage = await DataService.getPageByName(page).catch(e => console.log(e));
        if (storedPage){
            let pageObj = {
                page_name: storedPage.page_name,
                page_md: storedPage.page_md,
                page_title: storedPage.page_title,
                page_html: storedPage.page_html,
                page_mk: storedPage.page_mk,
            };
            return resolve(pageObj)
        } else {
            return reject( false )
        }

    })
}

function createMainBody(){
    return new Promise(async (resolve, reject) => {
        let services = await DataService.getServices().catch(e => console.log(e))
        console.log('SELECTED SERVICES ------>', services)
        let lis = services.map ((s, index) =>`<li> <a href="http://localhost:8480/main/services${s.page_name}">${s.name}  ${s.price} BYN</a></li>`);
        let body = `
            <h2>У нас самые низкие цены в городе </h2>
            <p>Наши услуги: </p>
            <ul>${lis}</ul>`
        console.log(body)
        return resolve(body);
    })
}

module.exports={
    createPageHeader,
    createMainBody,
    logLineAsync,
};
