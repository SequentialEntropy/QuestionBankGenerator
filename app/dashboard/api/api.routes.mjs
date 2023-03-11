import express from "express";
import auth from "../auth.middleware.mjs";

import createQuestion from "./createQuestion.handler.mjs";
import deleteQuestion from "./deleteQuestion.handler.mjs";
import getQuestions from "./getQuestions.handler.mjs";
import getSharedQuestions from "./getSharedQuestions.handler.mjs";

import copyQuestion from "./copyQuestion.handler.mjs";
import shareQuestion from "./shareQuestion.handler.mjs";
import dismissQuestion from "./dismissQuestion.handler.mjs";

const router = express.Router();

router.post("/createQuestion", auth, createQuestion);
router.get("/deleteQuestion/:questionId", auth, deleteQuestion);
router.get("/getQuestions", auth, getQuestions);
router.get("/getSharedQuestions", auth, getSharedQuestions);

router.get("/copyQuestion/:questionId", auth, copyQuestion);
router.post("/shareQuestion", auth, shareQuestion);
router.get("/dismissQuestion/:questionId", auth, dismissQuestion);

export { router };