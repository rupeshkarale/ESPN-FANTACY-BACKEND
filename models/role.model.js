const mongoose = require('mongoose');

//role schema

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
})

module.exports = mongoose.model("roles", roleSchema);