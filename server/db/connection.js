const mongoose = require('mongoose');
const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/TodoList');
        console.log("connected to MongoDB");
    } catch (err) {
        console.log("This is mongodb connection error: ");
    }
}
module.exports = connectDB;