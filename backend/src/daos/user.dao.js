import User from "../models/User.js";

export const getUserByEmail = async (email) => {
    return await User.find({ email: email });
}

export const getUserById = async (id) => {
    return await User.findById(id);
}

export const addUser = async (email, password) => {
    const newUser = new User({ email: email, password: password });
    return await newUser.save();
}