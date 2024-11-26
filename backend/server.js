const express = require("express");
const hostname = "127.0.0.1";
const PORT = 7010;
const app = express();
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const plannerRoutes = require('./routes/plannerRoutes')
require('dotenv').config()
const corsOptions = {
    origin: "http://localhost:5173"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/planner',plannerRoutes)



const mongoose = require("mongoose");
MONGO_URI = "mongodb+srv://lallemm17:manel1717@cluster0.xbvcmav.mongodb.net/";
mongoose.connect(MONGO_URI, { dbName: "plannerUser" });
const database = mongoose.connection;
database.once("open", () => {
    console.log("Connected to Users MongoDB");
});


app.listen(PORT, hostname, () => {
    console.log("Listening on port:", PORT);
});