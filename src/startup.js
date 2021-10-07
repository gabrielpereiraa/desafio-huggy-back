var moment = require('moment-timezone');
const env = process.env.NODE_ENV || 'development';
let config = require('../config/config.json');
config = config[env];

module.exports = function(){

    if(!config.jwtPrivateKey) throw new Error('jwtPrivateKey is not defined.');

    if(!config.username) throw new Error('username is not defined.');

    if(!config.password) throw new Error('password is not defined.');

    if(!config.database) throw new Error('database is not defined.');

    if(!config.host) throw new Error('host is not defined.');

    if(!config.dialect) throw new Error('dialect is not defined.');

    moment.locale('pt-BR');
}