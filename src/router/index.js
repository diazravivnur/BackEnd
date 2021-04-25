const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const { registration, login } = require("../controllers/auth");

//Router Users
router.get("/users", getUsers);
router.post("/user", createUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

//Router Auth
router.post("/register", registration);
router.post("/login", login);

module.exports = router;
