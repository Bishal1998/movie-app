import mongoose from "mongoose";

const connectToDB = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected Sucessfully");

    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`)
        process.exit(1);
    }
}
export default connectToDB;