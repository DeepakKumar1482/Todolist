const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connection.js')
app.use(express.json());
connectDB();
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use('/api/user', require('./Routes/userRoutes.js'));
app.listen(8080, (req, res) => {
    console.log("listening on prot 8080");
})