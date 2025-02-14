const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const User = require('./model/User')
const cors = require('cors')


//routes---
const userRoutes = require('./routes/userRoute')


const app = express()
dotenv.config();
app.use(cors());
app.use(express.json())


const port = process.env.PORT || 5050
const db = process.env.ATLAS_URI





//connection sa database ============================================================================================================================================
mongoose.connect(db)
    .then(() => {
        console.log("Connected to MongoDB Atlas")
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB Atlas: " + err)
    })



//routes dri ======================================================================================================================================================
app.use('/users', userRoutes)





//start sa server==================================================================================================================================================
app.listen(port, () => {
    console.log("Server stated on port " + port)
})