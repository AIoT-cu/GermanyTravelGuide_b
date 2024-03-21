const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

const createUser = async (username, email, password, role) => {
    const user = await Users.create({
        username,
        email,
        password,
        role,
    });
    return user;
};

const login = async (username, password) => {
    console.log("login controller");

    const user = await Users.findOne({ where: { username } });

    console.log("user", JSON.stringify(user));

    if (!user) {
        throw new AppError(`Authentication failed`, 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("passwordMatch", JSON.stringify(passwordMatch));
    
    if (!passwordMatch) {
        throw new AppError(`Authentication failed`, 401);
    }

    const token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );

    const refreshToken = jwt.sign(
        { userId: user.id, username: user.username, role: user.role },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );

    return { token, refreshToken };
};

const getUsers = async () => {
    const users = await Users.findAll();
    return users;
};

const getUserById = async (id) => {
    const user = await Users.findByPk(id);
    if (!user) {
        throw new AppError(`User not found`, 404);
    }
    user.password = undefined;
    return user;
};

const updateUser = async (id, username, email, role, password) => {
    const user = await Users.findByPk(id);
    if (!user) {
        throw new AppError(`User with id ${id} not found`, 404);
    }
    user.username = username;
    user.email = email;
    user.password = password;
    user.role = role;
    return await user.save();
};

const deleteUser = async (id) => {
    const user = await Users.findByPk(id);
    if (!user) {
        throw new AppError(`User with id ${id} not found`, 404);
    }
    return await user.destroy();
};

const refreshAuthToken = async (refreshToken) => {
    const decodedToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await Users.findByPk(decodedToken.userId);

    if (!user) {
        return res.status(401).json({
            message: "Authentication failed",
        });
    }

    const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );

    return token;
};

module.exports = {
    createUser,
    login,
    refreshAuthToken,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
