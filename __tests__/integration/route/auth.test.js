const request = require("supertest");
const db = require("../../../models");
let config = require('../../../config/config.json');

const env = 'test';
config = config[env];
const Contact = db.Contact;

let server;

describe('contacts', () => {

    beforeEach(() => { 
        auth = config.authorization;
        server = require('../../../src/server') 
    });

    afterEach(async() => {
        server.close();
    });

    const exec = () => {
        return request(server)
                .post('/auth')
                .set('authorization', `${auth}`);
    }

    it('should return 401 if environment variable authorization is wrong', async() => {
        auth = "123";
        const res = await exec();

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Authorization invalid.');
    });

    it('should return 200 if environment variable authorization is right', async() => {
        const res = await exec();

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('type');
        expect(res.body).toHaveProperty('value');
        expect(res.body).toHaveProperty('expiresIn');
    });
});