import User from "../models/userModels.js";
import bcrypt from 'bcryptjs'
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new Error("All fields are required.")
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(200).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json(newUser)

    } catch (error) {
        res.status(400);
        throw new Error("Invalid User Data");
    }
})

const userLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const userExists = await User.findOne({ email });

    if (!userExists) {
        return res.status(400).json({ message: "User does not exist" });
    }

    const passwordCheck = await bcrypt.compare(password, userExists.password);

    if (!passwordCheck) {
        return res.status(400).json({ message: "Password wrong" });
    }


    generateToken(res, userExists._id)

    const { password: pass, ...data } = userExists._doc;

    res.status(201).json(data)

})

const userLogout = asyncHandler(async (req, res) => {
    res.cookie('jwt', "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: "User logged out Successfully" })
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(404);
        throw new Error("User not found")
    } else {
        try {
            const { password, ...data } = user._doc
            res.status(200).json(data)

        } catch (error) {
            res.status(400);
            throw new Error("Couldn't get current user", error.message)
        }
    }
})

const updateCurrentUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);
    if (user) {

        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if (req.body.password) {

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            user.password = hashedPassword;
        }

        const updatedUser = await user.save();

        const { password, ...data } = updatedUser._doc

        res.status(200).json(data)

    } else {
        throw new Error("User not found")
    }
})


const deleteCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        throw new Error("User not found")
    } else {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "User Deleted successfully" })
        } catch (error) {
            res.status(400)
            throw new Error("Couldn't delete the user", error.message)
        }
    }
})


const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find({});

    res.status(200).json(users)
})


export { createUser, userLogin, updateCurrentUser, deleteCurrentUser, userLogout, getCurrentUser, getAllUsers }