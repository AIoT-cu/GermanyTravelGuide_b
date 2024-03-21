const express = require("express");
const AppError = require("../errors/AppError");
const authenticate = require("../middlewares/authenticate");
const {
    createUser,
    login,
    refreshAuthToken,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
} = require("../controllers/users");

const router = express.Router();

router.post("/signup", authenticate(["admin"]), async (req, res, next) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
        return next(new AppError("Missing requiered field to create user", 404));
    }
    try {
        const user = await createUser(username, email, password, role);
        res.status(201).json({
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const tokens = await login(username, password);

        res.status(200).json(tokens);
    } catch (error) {
        next(error);
    }
});

router.post("/logout", async (req, res, next) => {
    const { token } = req.body;

    try {
        res.status(200).send("Logout succesfully");
    } catch (error) {
        next(error);
    }
});

router.post("/user/refreshtoken", async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return next(new AppError("Authentication failed", 401));
    }

    try {
        const token = await refreshAuthToken(refreshToken);

        res.status(200).json({
            token,
        });
    } catch (error) {
        next(error);
    }
});

router.get(
    "/user/profile",
    authenticate(["admin", "editor"]),
    async (req, res, next) => {
        const { userId } = req.userData;

        try {
            const user = await getUserById(userId);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.get("/user", async (req, res, next) => {
    try {
        const users = await getUsers();

        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.get("/user/:id", async (req, res, next) => {
    if (!/^\d+$/.test(req.params.id)) {
        return next(new AppError("Wrong id. The id should be an integer.", 404));
    }
    try {
        const user = await getUserById(req.params.id);

        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.put(
    "/user/:id",
    authenticate(["admin", "editor"]),
    async (req, res, next) => {
        if (!/^\d+$/.test(req.params.id)) {
            return next(new AppError("Wrong id. The id should be an integer.", 404));
        }

        try {
            const user = await updateUser(
                req.params.id,
                req.body.username,
                req.body.email,
                req.body.password,
                req.body.role
            );
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);
router.delete(
    "/user/:id",
    authenticate(["admin", "editor"]),
    async (req, res, next) => {
        if (!/^\d+$/.test(req.params.id)) {
            return next(new AppError("Wrong id. The id should be an integer.", 404));
        }

        try {
            const user = await deleteUser(req.params.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
