const { Server } = require("socket.io");

const db = require("./models");

const Chat = db.chat;

const startWebsocketServer = (server) => {
    const io = new Server (server, {cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }});

    io.on("connection", (socket) => {
        socket.on("add_user_to_rooms",
            async({userId}) => {
                Chat.find({participants: userId}).exec((err, chats) => {
                    chats.forEach((chat) => {
                        socket.join(chat.chatname);
                    });

                })
            })




        socket.on("new_message", async(payload)=>{
            const {id, newMessage, author, chatname} = payload;

            Chat.findById(id, (err, chat) => {
                if (err) {
                    return socket.emit("error", err);
                }

                const allMessages = chat.messages;
                allMessages.push({
                    text: newMessage,
                    author: author,
                    date: new Date()
                });
                Chat.updateOne({_id: id}, {
                    messages: allMessages
                }).exec((err, chat) => {
                    if (err) {
                        socket.emit("error", err);
                        return;
                    }
                    socket.to(chatname).emit("chat_updated", chat);
                })
            })
        })
    });
}

module.exports = {
    startWebsocketServer
};