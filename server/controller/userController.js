import User from "../models/userModels.js";

const createUser = async (req, res) => {
    console.log("User Created")
}

const userLogin = async (req, res) => {
    console.log("User Logged in")
}

const userLogout = async (req, res) => {
    console.log("User Logged Out")
}

const getCurrentUser = async (req, res) => {
    console.log("Get Current User")
}

const updateCurrentUser = async (req, res) => {
    console.log("Current User Updated")
}
const deleteCurrentUser = async (req, res) => {
    console.log("User Deleted")
}


const getAllUsers = async (req, res) => {
    console.log("Get All Users")
}


export { createUser, userLogin, updateCurrentUser, deleteCurrentUser, userLogout, getCurrentUser, getAllUsers }