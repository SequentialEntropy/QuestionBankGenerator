import { dirname, join } from "path";
import { fileURLToPath } from "url";

import express from "express";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/question");
})

export { router };