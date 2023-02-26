import express from "express";

import dashboard from "./dashboard.handler.mjs";

const router = express.Router();

router.get("/", dashboard);

export { router };