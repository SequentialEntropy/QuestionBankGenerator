import express from "express";
import auth from "../auth.middleware.mjs";

import createQuestion from "./createQuestion.handler.mjs";
import deleteQuestion from "./deleteQuestion.handler.mjs";
import getQuestions from "./getQuestions.handler.mjs";

const router = express.Router();

router.post("/createQuestion", auth, createQuestion);
router.get("/deleteQuestion/:questionId", auth, deleteQuestion);
router.get("/getQuestions", auth, getQuestions);

export { router };