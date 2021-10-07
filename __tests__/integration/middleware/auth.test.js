const request = require("supertest");
const moment = require("moment");
const db = require("../../../models");
const jwt = require('jsonwebtoken');
let config = require('../../../config/config.json');

const env = 'test';
config = config[env];
const Contact = db.Contact;

let server;
let token = '';
let tokenType = 'Bearer';
let body;

describe('middleware auth', () => {

    let contactId;
    let contact;

    beforeEach(async() => {
        server = require('../../../src/server')

        contact = await Contact.create({
            name: 'Gabriel da Silva',
            email: 'gabriel@hotmail.com',
            phone: '7233444444',
            cell: '3222228888'
        }).then(data => {return data});

        contactId = contact.id;

        generateJWT();
    });

    afterEach(async() => {
        server.close();
        await Contact.destroy({where: {}, truncate: true})
    });

    const generateJWT = () => {
        expiresIn = moment().add(1, 'hours').unix();
        token = jwt.sign({expiresIn: expiresIn}, config.jwtPrivateKey);
        tokenType = 'Bearer';
    }

    const exec = () => {
        return request(server)
            .get(`/contacts/${contactId}`)
            .set('authorization', `${tokenType} ${token}`);
    };

    it('should return 401 if token is not sended', async() => {
        token = '';
        tokenType = '';
        const res = await exec();

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Token not sent.');
    });

    it('should return 401 if token type is not valid', async() => {
        tokenType = 'Basic';
        const res = await exec();

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid token type.');
    });

    it('should return 401 if token is not valid', async() => {
        token = '12345';
        const res = await exec();
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid token.');
    });

    it('should return 401 if token is expired', async() => {
        token = jwt.sign({
            expiresIn: moment().add('-1', 'hours').unix(),
        }, config.jwtPrivateKey);

        const res = await exec();
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Expired token.');
    });

    it('should return 200 if token is valid and not expired', async() => {
        const res = await exec();
        expect(res.status).toBe(200);
    });
});