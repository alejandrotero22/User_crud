const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    firstName: String,
    lastName: String,
    email: String,
},{
    collection: 'user',
});

module.exports = mongoose.model('user', userSchema);