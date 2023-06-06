const express = require("express");
const mongoose = require('mongoose');
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/api', userRouter);
app.use('/api', authRouter);

const start = async () => {
    try {
        await mongoose.connect('');
        app.listen(5000, () => {
            console.log(`Server started on PORT ${5000}`);
        });

    }
    catch (e) {
        console.log(e);
    }
}

start();