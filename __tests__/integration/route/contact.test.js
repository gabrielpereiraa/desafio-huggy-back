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

describe('contacts', () => {

    beforeEach(() => { server = require('../../../src/server') });

    afterEach(async() => {
        server.close();
        await Contact.destroy({where: {}, truncate: true})
    });

    const generateJWT = () => {
        expiresIn = moment().add(1, 'hours').unix();
        token = jwt.sign({expiresIn: expiresIn}, config.jwtPrivateKey);
    }

    describe('/', () => {

        describe('GET', () => {
            beforeEach(() => { generateJWT(); });

            it('should return status 200 and all contacts', async() => {
                const contacts = [
                    { name: 'Gabriel da Silva', email: 'gabriel@hotmail.com', phone: '7533333333', cell: '7588888888' },
                    { name: 'Jorge Pereira', email: 'jorger@hotmail.com', phone: '7233444444', cell: '3222228888' },
                ]
                await Contact.create(contacts[0]);
                await Contact.create(contacts[1])

                const res = await request(server)
                                    .get('/contacts')
                                    .set('authorization', `${tokenType} ${token}`);
                
                expect(res.status).toBe(200);
                expect(res.body.length).toBe(2);
                expect(res.body.some(contact => contact.name === contacts[0].name && contact.email === contacts[0].email)).toBeTruthy();
                expect(res.body.some(contact => contact.name === contacts[1].name && contact.email === contacts[1].email)).toBeTruthy();
            });

            it('should return status 200 and empty body if has no contacts in database', async () => {
                await Contact.destroy({where: {}, truncate: true});
    
                const res = await request(server)
                                    .get('/contacts')
                                    .set('authorization', `${tokenType} ${token}`);
                expect(res.status).toBe(200);
                expect(res.body.length).toBe(0);
            });

        });

        describe('POST', () => {
            beforeEach(() => {
                body = {
                    name: 'Gabriel da Silva',
                    email: 'gabriel@hotmail.com',
                    phone: '7233444444',
                    cell: '3222228888'
                }
            });

            const exec = () => {
                return request(server)
                        .post('/contacts')
                        .send(body)
                        .set('authorization', `${tokenType} ${token}`);
            }

            it('should return status 200 and create new contact', async () =>{
                const res = await exec();

                expect(res.status).toBe(200);
                expect(res.body.message).toBe('New contact created.');
            });

            it('should return status 400 if body is not valid', async () =>{
                body = {
                    name: 'Gab',
                    email: 'g@',
                    //phone: '3123',
                    cell: '12312'
                };

                const res = await exec();
                expect(res.status).toBe(400);
                expect(res.body.message).toBe('Bad Request.');
            });

            it('should return status 409 if email already exists', async () =>{
                await Contact.create(body);

                const res = await exec();
                expect(res.status).toBe(409);
                expect(res.body.message).toBe('Contact already registered.');
            });
        });
    })

    describe('/:', () => {
        let contact;
        let contactId;

        beforeEach(async() => {
            contact = await Contact.create({
                name: 'Gabriel da Silva',
                email: 'gabriel@hotmail.com',
                phone: '7233444444',
                cell: '3222228888'
            }).then(data => {return data});

            contactId = contact.id;

            generateJWT();
        });

        describe('GET', () => {
            const exec = () => {
                return request(server)
                    .get(`/contacts/${contactId}`)
                    .set('authorization', `${tokenType} ${token}`);
            }

            it('should return status 404 if contact not exist', async () => {
                contactId = Math.floor(Math.random() * 101) + 2;

                const res = await exec(); 
                expect(res.status).toBe(404);
                expect(res.body.message).toBe('Contact not found.');
            });

            it('should return status 200 if contact exist', async () => {
                const res = await exec();
                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty('name', contact.name);
                expect(res.body).toHaveProperty('email', contact.email);
                expect(res.body).toHaveProperty('phone', contact.phone);
                expect(res.body).toHaveProperty('cell', contact.cell);
            });
        });

        describe('PUT', () => {

            beforeEach(() => {
                body = {
                    name: 'Gabriel Pereira - UPDATED',
                    email: 'gabrielpereira-updated@hotmail.com',
                    phone: '31313131313',
                    cell: '41414141414'
                }
            });

            const exec = () => {
                return request(server)
                    .put(`/contacts/${contactId}`)
                    .set('authorization', `${tokenType} ${token}`)
                    .send(body);
            }

            it('should return status 404 if contact not found', async () => {
                contactId = Math.floor(Math.random() * 101) + 2;

                const res = await exec();
                expect(res.status).toBe(404);
                expect(res.body.message).toBe('Contact not found.');
            });

            it('should return status 400 if body is not valid', async () => {
                body = {
                    name: '',
                    email: '11111111111111111111',
                    phone: '111111111111111111111111111',
                    cell: '11111111111111111111'
                }

                const res = await exec();
                expect(res.status).toBe(400);
                expect(res.body.message).toBe('Bad Request.');
            });

            it('should return status 200 if contact is updated', async () => {
                const res = await exec();
                expect(res.status).toBe(200);
                expect(res.body.message).toBe('Contact updated.');
            });

        });

        describe('DELETE', () => {
            const exec = () => {
                return request(server)
                    .delete(`/contacts/${contactId}`)
                    .set('authorization', `${tokenType} ${token}`);
            }

            it('should return 404 if contact not found', async () => {
                contactId = Math.floor(Math.random() * 101) + 2;

                const res = await exec();
                expect(res.status).toBe(404);
                expect(res.body.message).toBe('Contact not found.');
            });

            it('should return 200 if user is deleted', async () => {
                const res = await exec();
                expect(res.status).toBe(200);
                expect(res.body.message).toBe('Contact deleted.');
            });

        })

    });

})