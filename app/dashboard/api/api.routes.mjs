import express from "express";
import auth from "../auth.middleware.mjs";

import createQuestion from "./createQuestion.handler.mjs";
import deleteQuestion from "./deleteQuestion.handler.mjs";

const router = express.Router();

router.get("/createQuestion", auth, createQuestion);
router.get("/deleteQuestion/:questionId", auth, deleteQuestion);

export { router };