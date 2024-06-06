const mongoose = require("mongoose");
require("dotenv").config();

const dbID = process.env.DB_ID;
const dbPassword = process.env.DB_PASSWORD;
mongoose.set("strictQuery", false);
const connection = mongoose.connect(`mongodb+srv://${dbID}:${dbPassword}@cluster-new.vpkt4iy.mongodb.net/Espn?retryWrites=true&w=majority&appName=Cluster-new`)


module.exports = connection;

