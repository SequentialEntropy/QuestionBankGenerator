import express from "express";

// Endpoint Handlers
import auth from "./auth.handler.mjs";
import login from "./login.handler.mjs";
import logout from "./logout.handler.mjs";

const router = express.Router();

// example.domain/login/
router.get("/", login);

// example.domain/login/auth/
router.post("/auth", auth);

router.get("/logout", logout);

router.get("/test", (req, res) => {
    res.sendStatus(200);
})

export { router };