const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const db = require("./config/database");
const cookieParser = require('cookie-parser');
const router = require('./routes/apiRoutes');
const ErrorMiddleWare = require('./middlewares/error');


dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, DELETE , PUT"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization , Set-Cookie");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api',router);
app.use(cookieParser());
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
app.use(ErrorMiddleWare);

//* DB Connection & Server Start 
db();

const server = app.listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${process.env.PORT}`);
});

// * Unhandled Rejection Error
process.on("unhandledRejection", (err) => {
    console.log((`Error : ${err.message}`));
    console.log(`Shutting Down due to unhandled rejection`);
    server.close(() => {
        process.exit(1);
    });
});

// * Uncaught Exception Error
process.on("uncaughtException", (err) => {
    console.log((`Error : ${err.message}`));
    console.log(`Shutting Down due to uncaught Exception Error`);
    server.close(() => {
        process.exit(1);
    });
});


