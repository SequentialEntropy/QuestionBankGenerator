import express from "express";
// Import Auth middleware
import auth from "../auth.middleware.mjs";

import createStep from "./createStep.handler.mjs";
import getSteps from "./getSteps.handler.mjs";
import moveStep from "./moveStep.handler.mjs";
import deleteStep from "./deleteStep.handler.mjs";
import getPrompt from "./getPrompt.handler.mjs";
import getVariables from "./getVariables.handler.mjs";
import createFunction from "./createFunction.handler.mjs";
import deleteFunction from "./deleteFunction.handler.mjs";
import createBlock from "./createBlock.handler.mjs";
import deleteBlock from "./deleteBlock.handler.mjs";
import editBlock from "./editBlock.handler.mjs";
import editFunction from "./editFunction.handler.mjs"
import createVariable from "./createVariable.handler.mjs";
import deleteVariable from "./deleteVariable.handler.mjs";

const router = express.Router();

// Use Auth middleware to ensure all endpoints are protected
router.get("/:questionId/createStep", auth, createStep)
router.get("/:questionId/getSteps", auth, getSteps)
router.get("/:questionId/moveStep/:selected/:targeted", auth, moveStep)
router.get("/:questionId/deleteStep/:selected", auth, deleteStep)
router.get("/:questionId/getPrompt", auth, getPrompt)
router.get("/:questionId/getVariables", auth, getVariables)
router.post("/:questionId/createFunction/:sectionId", auth, createFunction)
router.get("/:questionId/deleteFunction/:sectionId/:functionIndex", auth, deleteFunction)
router.put("/:questionId/createBlock/:sectionIndex/:functionIndex/:path", auth, createBlock)
router.get("/:questionId/deleteBlock/:sectionIndex/:functionIndex/:path", auth, deleteBlock)
router.put("/:questionId/editBlock/:sectionIndex/:functionIndex/:path", auth, editBlock)
router.put("/:questionId/editFunction/:sectionIndex/:functionIndex", auth, editFunction)
router.post("/:questionId/createVariable", auth, createVariable);
router.put("/:questionId/deleteVariable", auth, deleteVariable);

export { router };