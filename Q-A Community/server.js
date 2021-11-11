const express = require('express');
const userRouter = require('./routers/userRouter');
const qRouter = require('./routers/questionRouter');
const aRouter = require('./routers/answerRouter');
require('./config/mongoose');
const cookieParser = require('cookie-parser');
const moment = require('moment');

const app = express();
app.locals.moment = moment;

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
// middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use(userRouter, qRouter, aRouter);

app.listen(2020, () => console.log("Listening to the port 2020 ..."));