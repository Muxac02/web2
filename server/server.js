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
db = require('./models/index');

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("MongoDB Connected");
}).catch(()=>{
    console.log("Error. DB is not connected");
    process.exit();
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

