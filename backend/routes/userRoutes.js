const express = require("express");
const router = express.Router();
const {login} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMIddleware");

const { registerUser } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", login);

router.get("profile", authMiddleware, (req, res) =>{
    res.json({
        massega: "Route protected",
        user: req.user
    });
});

module.exports = router;