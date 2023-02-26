// import { router as questionRoutes } from "./webserver/routes/questionRouter.mjs";
import { router as loginRoutes} from "./app/login/login.routes.mjs";
import { router as questionRoutes } from "./app/question/question.routes.mjs";
import { router as dashboardRoutes } from "./app/dashboard/dashboard.routes.mjs";

import express from "express";

const router = express.Router();

router.use("/", dashboardRoutes);

router.use("/login", loginRoutes);

router.use("/question", questionRoutes);

export default router;