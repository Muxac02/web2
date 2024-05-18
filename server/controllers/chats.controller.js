const db = require('../models');
const bcrypt = require("bcrypt");

const Chat = db.chat;

const createChat = (req, res) => {
    const chat = new Chat({
        chatname: req.body.chatname,
        participants: req.body.participants,
        owner: req.body.owner,
        messages: []
    });
    chat.save((err,chat) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send({message: "Chat successfully saved"});
        console.log(`Chat with name ${chat.chatname} is saved`);
    })
}

const getChats = (req, res) => {
    console.log(req.params.user);
    Chat.find({participants: req.params.user}).exec((err, chats)=>{
        if (err) {
            return res.status(500).send({message: err});
        }
        if (!chats.length) {
            return res.status(404).send({message: `Chats for ${req.params.user} haven't been found`});
        }
        res.status(200).send({message: "Chats have been found", payload: chats});
    })
}

const deleteChat = (req, res) => {
    const id = req.params.id;
    Chat.findById(id, (err, chat) => {
        if (err) {
            return res.status(500).send({message: err});
        }
        if (!chat) {
            return res.status(404).send({message: `Chat for ${req.body.owner} hasn't been found`});
        }
        if (chat.owner !== req.body.owner) {
            return res.status(401).send({message: `This user can't delete this chat`});
        }
        Chat.deleteOne({_id: id}, (err, chat) => {
            if (err) {
                return res.status(500).send({message: err});
            }
            res.status(200).send({message: `Chat named ${req.body.chatname} has been deleted`});
        })
    })
}

const updateChat = (req, res) => {
    Chat.updateOne({id: req.params.id}, {
        chatname: req.body.chatname,
        participants: req.body.participants,
        owner: req.body.owner,
        messages: req.body.messages
    }).exec((err, chat)=>{
        if (err) {
            return res.status(500).send({message: err});
        }
        if (!chat) {
            return res.status(404).send({message: `Chat for ${req.body.id} hasn't been found`});
        }
        res.status(200).send({message: "Chat has been updated", chat});
    })
}

module.exports = {
    createChat,
    getChats,
    deleteChat,
    updateChat
}