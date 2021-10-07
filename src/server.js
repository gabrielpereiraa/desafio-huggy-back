const app = require('./app'); //main class
const startup = require('./startup')(); //check environment variables

const env = process.env.NODE_ENV || 'development';

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(` ENV: ${env} \n PORT: ${port}`));

module.exports = server;