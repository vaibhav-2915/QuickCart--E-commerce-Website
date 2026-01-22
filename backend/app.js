const express = require("express");
const cors = require("cors");
require("dotenv").config()
const connectDB = require("./config/db.js");
const router = require("./routes/index.js");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json({limit:'50mb'}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}
));
app.use(cookieParser());    


app.use("/api",router);

const port = process.env.PORT || 8080;
connectDB().then(()=>{
    app.listen(port,()=>{
        // console.log(process.env.MONGODB_URI);        
        console.log("Database connected");
        console.log("server is running on port 8080");
    })
});