import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectToDB();

const app = express();
const PORT = process.env.PORT;


app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Server is working" })
})

app.listen(PORT, (req, res) => {
    console.log(`Server listening on ${PORT}`);
})