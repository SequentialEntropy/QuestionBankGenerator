import express from "express";

import generate from "./generate.handler.mjs";

const router = express.Router();

router.get("/:questionId", generate);

export { router }