const User = require('../model/User');

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
    }
};


// Get single user 
const getUserById = async (req, res) => {
    const userId = req.params.id

    try{

        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json(user)

    }catch(err){

        return res.status(500).json({message: "An error occured", error: err})

    }
}


// Create a new user
const createUser = async (req, res) => {
    const { name, username, password } = req.body;
    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "Username already exists!" });
        }
        const newUser = new User({ name, username, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err });
    }
};

// Update user details
const updateUser = async (req, res) => {
    const { name, username, password } = req.body;
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userExists = await User.findOne({ username });
        if (userExists && userExists._id.toString() !== userId) {
            return res.status(400).json({ message: "Username already exists" });
        }

        user.name = name || user.name;
        user.username = username || user.username;
        user.password = password || user.password;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Error updating user", error: err });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndDelete(userId)
        
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json({message: "User deleted successfully", user: user._id})
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
