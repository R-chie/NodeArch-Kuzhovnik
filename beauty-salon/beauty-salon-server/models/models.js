const Sequelize = require("sequelize");
const DbService = require('../services/db.service');

const User = DbService.define('user', {
    // attributes
    login: {
        type: Sequelize.INTEGER,
    },
    password: {
        type: Sequelize.STRING
    },
    salt : {
        type: Sequelize.STRING
    },
    role : {
        type: Sequelize.STRING
    }
}, {
    // options
});

const Token = DbService.define('token', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    jwt_key_id : {
        type : Sequelize.STRING
    },
    jwt_exp : {
        type : Sequelize.STRING
    },
    jwt : {
        type : Sequelize.STRING
    }
});

const Master = DbService.define('master', {
    name : {
        type : Sequelize.STRING
    },
    services : {
        type : Sequelize.STRING
    },
    order_count : {
        type : Sequelize.INTEGER
    }
});

const Service = DbService.define('service', {
    name : {
        type : Sequelize.STRING
    },
    code : {
        type : Sequelize.STRING
    },
    desc : {
        type : Sequelize.STRING
    },
    master_id : {
        type: Sequelize.INTEGER
    },
    page_id : {
        type: Sequelize.INTEGER
    },
    price : {
        type: Sequelize.DOUBLE
    }

});

const Daily = DbService.define('daily_order', {
    time : {
        type : Sequelize.DATE
    },
    service_id : {
        type : Sequelize.INTEGER
    },
    status_id : {
        type : Sequelize.STRING
    },
    master_id : {
        type: Sequelize.INTEGER
    }
});

const Custom = DbService.define('custom_order', {
    time : {
        type : Sequelize.DATE
    },
    service_id : {
        type : Sequelize.INTEGER
    },
    status_id : {
        type : Sequelize.INTEGER
    },
    master_id : {
        type: Sequelize.INTEGER
    }
});

const Random = DbService.define('random_order', {
    time : {
        type : Sequelize.DATE
    },
    service_id : {
        type : Sequelize.INTEGER
    },
    status_id : {
        type : Sequelize.INTEGER
    },
    master_id : {
        type: Sequelize.INTEGER
    }
});

const Page = DbService.define('page', {
    page_name : {
        type : Sequelize.STRING
    },
    page_title : {
        type : Sequelize.STRING
    },
    page_md : {
        type : Sequelize.STRING
    },
    page_mk : {
        type : Sequelize.STRING
    },
    page_html : {
        type : Sequelize.STRING
    },
    last_modified : {
        type: Sequelize.DATE
    }
});

const Models = {
    User, Token, Master, Service, Daily, Custom, Random, Page
};

DbService.sync().then(result => console.log('sync success ' + result.config.database))
    .catch(err=> console.log(err));


module.exports = Models;
