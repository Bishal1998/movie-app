import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.json({ message: "Server is working" })
})

app.listen(PORT, (req, res) => {
    console.log(`Server listening on ${PORT}`);
})