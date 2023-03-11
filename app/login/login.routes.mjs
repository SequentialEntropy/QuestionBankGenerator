import express from "express";

// Endpoint Handlers
import auth from "./auth.handler.mjs";
import createUser from "./createUser.handler.mjs";
import login from "./login.handler.mjs";
import logout from "./logout.handler.mjs";
import signup from "./signup.handler.mjs";

const router = express.Router();

// example.domain/login/
router.get("/", login);

router.get("/signup", signup);

// example.domain/login/auth/
router.post("/auth", auth);

router.post("/createUser", createUser);

router.get("/logout", logout);

export { router };