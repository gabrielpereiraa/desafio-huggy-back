const db = require("../../models");
const Contact = db.Contact;
const Op = db.Sequelize.Op;

const _ = require('lodash');

class UserController{
    async index(req, res){
        Contact.findAll()
            .then(data => { res.status(200).send(data); })
            .catch(err => { res.status(500).send(err.message)});
    }

    async store(req, res){

        if(!req.body.name) return res.status(400).json({message: 'Bad Request.'});

        if(!req.body.email) return res.status(400).json({message: 'Bad Request.'});

        if(!req.body.phone) return res.status(400).json({message: 'Bad Request.'});

        if(!req.body.cell) return res.status(400).json({message: 'Bad Request.'});

        let contact = await Contact.findAll({where:{email:req.body.email}})
            .then(data => { return data })
            .catch(err => { return err})

        if(contact.length > 0){
            return res.status(409).json({message: 'Contact already registered.'});
        } 
        
        let newContact = await Contact.create(req.body)
            .then(data => { return data })
            .catch(err => { return { errorMessage: err.message }})

        if(newContact.errorMessage){
            return res.status(400).json({message: newContact.errorMessage});    
        }
        
        return res.status(200).json({message: 'New contact created.', contactId: newContact.id});
    }

    async show(req, res){

        const id = req.params.id;

        if(!id) return res.status(400).json({message: 'Bad Request.'});

        let contact = await Contact.findByPk(id)
            .then(data => { return data })
            .catch(err => { return { errorMessage: err.message }})
        
        if(!contact){
            return res.status(404).json({message: 'Contact not found.'});
        }

        if(contact.errorMessage){
            return res.status(500).send(contact.errorMessage);
        }

        return res.status(200).send(contact);
    }

    async update(req, res){

        if(!req.body.name) return res.status(400).json({message: 'Bad Request.'});

        if(!req.body.email) return res.status(400).json({message: 'Bad Request.'});

        if(!req.body.phone) return res.status(400).json({message: 'Bad Request.'});

        if(!req.body.cell) return res.status(400).json({message: 'Bad Request.'});

        Contact.update(req.body, {where: {id: req.params.id}})
            .then(num => {
                if (num == 1) {
                    return res.status(200).json({message: 'Contact updated.', contactId: req.params.id});
                } else {
                    return res.status(404).json({message: 'Contact not found.'});
                }
            })
            .catch(err => {
                return res.status(400).json({message: 'Bad Request.'});
            });
    }

    async delete(req, res){

        if(!req.params.id) return res.status(400).json({message: 'Bad Request.'});

        Contact.destroy({where: {id: req.params.id}})
            .then(num => {
                if (num == 1) {
                    return res.status(200).json({message: 'Contact deleted.', contactId: req.params.id});
                } else {
                    return res.status(404).json({message: 'Contact not found.'});
                }
            })
            .catch(err => {
                return res.status(500).json({message: err.message});
            });
    }
}

module.exports = new UserController();