import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import favRoutes from './routes/favRoutes.js';

dotenv.config();

connectToDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'https://movie-client-xi.vercel.app',
    credentials: true,
}));
app.set('trust proxy', 1);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/fav", favRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Server is working" })
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})