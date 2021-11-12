//IMPORTS
const winston = require("winston");
const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
const app = express();
let server;

const resolveCrossDomain = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    res.header("Access-Control-Allow-Credentials", true);
    res.header("Strict-Transport-Security", 'max-age=15552000');
    if ("OPTIONS" == req.method) {
        res.send(200);
    } else {
        next();
    }
};


app.use(helmet());
app.use(resolveCrossDomain);
app.use(function applyXFrame(req, res, next) {
    res.set('X-Frame-Options', 'DENY');
    next();
});
//SECURITY(app);
require("./startup/routes")(app, server);

const port = process.env.PORT || 3000;
server = app.listen(port, () => {
    console.info(`[SERVER STARTED] Listening to port [${port}]`);
});

module.exports = server;

