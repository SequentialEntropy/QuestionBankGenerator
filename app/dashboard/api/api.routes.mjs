import express from "express";
import auth from "../auth.middleware.mjs";

import createQuestion from "./createQuestion.handler.mjs";

const router = express.Router();

router.get("/createQuestion", auth, createQuestion)

export { router };