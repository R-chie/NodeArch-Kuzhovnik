module.exports = {
    origin: '*', // разрешаем запросы с любого origin, вместо * здесь может быть ОДИН origin

    optionsSuccessStatus: 200, // на preflight-запрос OPTIONS отвечать кодом ответа 200

};