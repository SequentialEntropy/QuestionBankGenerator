import express from "express";
import auth from "./auth.middleware.mjs";

import generate from "./generate.handler.mjs";

const router = express.Router();

router.get("/:questionId", auth, generate);

export { router }