const routes = require('express').Router();
const env = process.env.NODE_ENV || 'development';
let config = require('../../config/config.json');
config = config[env];
const moment = require('moment');
const jwt = require('jsonwebtoken');

/* == Controllers == */
const ContactController = require('../controllers/ContactController');

/* == Middlewares == */
const auth = require('../middleware/auth');

/* == Routes == */
routes.post('/auth', (req, res, to) => {
    if(req.headers.authorization == config.authorization){
        expiresIn = moment().add(1, 'hours').unix();

        var token = jwt.sign({expiresIn: expiresIn}, config.jwtPrivateKey);
    
        return res.status(200).json({ type: 'Bearer', value: token, expiresIn: expiresIn });
    }else{
        return res.status(401).json({message: 'Authorization invalid.'});
    }
});


routes.route('/contacts')
    .all(auth)
    .post(ContactController.store)
    .get(ContactController.index);

routes.route('/contacts/:id')
    .all(auth)
    .get(ContactController.show)
    .put(ContactController.update)
    .delete(ContactController.delete);

/* == exports == */
module.exports = routes;