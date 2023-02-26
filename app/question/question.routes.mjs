import express from "express";

import auth from "./auth.middleware.mjs";
import { router as apiRoutes } from "./api/api.routes.mjs";

// Endpoint Handlers
import question from "./question.handler.mjs";

const router = express.Router();

router.use("/api", apiRoutes);

// example.domain/question/:questionId
router.get("/:questionId", auth, question);

// example.domain/question/test/:questionId
router.get("/test/0", (req, res) => {
    // res.sendStatus(200);
    res.send("TEST");
})

export { router };