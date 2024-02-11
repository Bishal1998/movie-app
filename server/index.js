import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectToDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Server is working" })
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})