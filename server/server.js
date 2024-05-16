const mongoose = require("mongoose");
let express;
let cors;
let dbConfig;
let db;


cors = require('cors');
express = require('express');
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
dbConfig = require('./config/db.config');
db = require('./models');
const User = db.user;

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("MongoDB Connected");
    initial();
}).catch((err)=>{
    console.log("Error. DB is not connected:", err);
    process.exit();
})


function initial() {
    User.estimatedDocumentCount((err, count) => {
        if (!err)
        {
            console.log("Users count: ,",count)
            if (count == 0)
            {
                new User({
                    username: "Admin",
                    nickname: "Muxac",
                    email: "test@test.com",
                    password: "test123",
                }).save((err) => {
                    if (err) {
                        console.log("Admin not saved: ", err);
                    } else {
                        console.log("Admin saved");
                    }
                })
            }
        }
    });
}

const auth = require("./routes/auth.routes");
const authCheck = require("./routes/authCheck.routes");

auth(app);
authCheck(app);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

