const fsp = require('fs').promises;
const fs = require('fs');
const os = require('os');
const Jimp = require('jimp');
const path = require('path');
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
        console.log('SELECTED SERVICES ------>', services);
        let lis = services.map ((s, index) =>`<li> <a href="http://localhost:8481/main/services${s.page_name}">${s.name}  ${s.price} BYN</a></li>`);
        let body = `
            <h2>У нас самые низкие цены в городе </h2>
            <p>Наши услуги: </p>
            <ul>${lis}</ul>`
        console.log(body)
        return resolve(body);
    })
}

function sitemap(){
    return new Promise(async (resolve, reject) => {
        let pages = await DataService.getPages().catch(e => console.log(e));
        let lastMod = {};
        pages.forEach( page => lastMod[page.page_name] = page.last_modified)
        console.log(lastMod)
        const sitemap=`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
        ${
            pages.map( page => `
        <url>
            <loc>https://ourbestsite.com${page.page_name}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
            <lastmod>${ lastMod[page.page_name] ? lastMod[page.page_name].toISOString() : "" }</lastmod>
        </url>    
    `).join("")
            }
</urlset>
    `;
        try {
            await fsp.writeFile(path.resolve(__dirname,"public/sitemap.xml"), sitemap); //save
            console.log('sitemap.xml has been saved.');
        }
        catch ( err ) {
            console.log(err);
        }
    })
}
function processingBg(path){
    Jimp.read(path)
        .then( bg => {
            loadedImg = bg;
            return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
        })
        .then( font => {
            loadedImg.print(font, 110, 0, 'https://github.com/R-chie/NodeArch-Kuzhovnik/tree/master/beauty-salon')
                .write('./public/images/beauty_salon_bg.png') // save
        })
}


module.exports={
    createPageHeader,
    createMainBody,
    logLineAsync,
    sitemap,
    processingBg,
};
