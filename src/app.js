const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

class ApplicationClass{

    constructor(){
        this.express = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.express.use(express.json());
        this.express.use(helmet());

        this.express.use(cors({
            origin: '*', 
            credentials: true,
            optionSuccessStatus: 200,
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        }));
    }

    routes(){
        this.express.use('/', require('./routes/index'));
    }
}

module.exports = new ApplicationClass().express;