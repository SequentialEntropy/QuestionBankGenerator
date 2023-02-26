import { log } from "../utils/logger.mjs";

export default function logger(req, res, next) {
    log("Listener", `[${req.method}] ${req.url}`);
    next();
}