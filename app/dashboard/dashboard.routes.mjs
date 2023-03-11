import express from "express";


import { router as apiRoutes } from "./api/api.routes.mjs";

import dashboard from "./dashboard.handler.mjs";

const router = express.Router();

router.get("/", dashboard);

router.use("/dashboard/api", apiRoutes);

export { router };