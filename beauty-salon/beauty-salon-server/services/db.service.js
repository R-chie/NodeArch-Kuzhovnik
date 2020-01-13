const Sequelize = require("sequelize");
const DbService = new Sequelize('beauty_salon_site', 'root', 'wsedrf', {
    dialect: "mysql",
    host: "localhost",
    port: "3306",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});
/*const sequelize = new Sequelize('mysql://root:1234@localhost/beauty_salon_site');*/

module.exports = DbService;
