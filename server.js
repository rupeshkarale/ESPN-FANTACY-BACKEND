const express = require("express");
const cors = require('cors');
const connection = require("./config/db.js");
const userRouter = require('./controllers/user.controller')
const roleRouter = require('./controllers/role.controller')
const expenceRouter = require('./controllers/expence.controller')
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', expenceRouter)
app.use('/', userRouter);
app.use('/', roleRouter);
app.get("/", (req, res) => {
    res.send("Hello World!");
});

const port = process.env.PORT || 8080;

//connection to database
app.listen(port, async (req, res) => {
    try {
        await connection;
        console.log("connected");
    } catch (error) {
        console.log(error.message);
    }
});
