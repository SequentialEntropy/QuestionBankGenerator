import express from "express";
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
import { editBlock, clearBlock } from "./editBlock.handler.mjs";
import { editFunction, clearFunction} from "./editFunction.handler.mjs";

const router = express.Router();

router.get("/:questionId/createStep", auth, createStep)
router.get("/:questionId/getSteps", auth, getSteps)
router.get("/:questionId/moveStep/:selected/:targeted", auth, moveStep)
router.get("/:questionId/deleteStep/:selected", auth, deleteStep)
router.get("/:questionId/getPrompt", auth, getPrompt)
router.get("/:questionId/getVariables", auth, getVariables)
router.get("/:questionId/createFunction/:sectionId/:functionType", auth, createFunction)
router.get("/:questionId/deleteFunction/:sectionId/:functionIndex", auth, deleteFunction)
router.get("/:questionId/createBlock/:sectionIndex/:functionIndex/:path/:blockType/:params", auth, createBlock)
router.get("/:questionId/deleteBlock/:sectionIndex/:functionIndex/:path", auth, deleteBlock)
router.get("/:questionId/editBlock/:sectionIndex/:functionIndex/:path/:newValue", auth, editBlock)
router.get("/:questionId/editBlock/:sectionIndex/:functionIndex/:path/", auth, clearBlock)
router.get("/:questionId/editFunction/:sectionIndex/:functionIndex/:newValue", auth, editFunction)
router.get("/:questionId/editFunction/:sectionIndex/:functionIndex/", auth, clearFunction)

router.get("/test", (req, res) => {
    res.send("API");
})

export { router };