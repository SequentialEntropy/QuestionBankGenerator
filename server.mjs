import express from "express";
import sessions from "express-session";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);



import router from "./routes.mjs";
import { log, enableLog } from "./utils/logger.mjs";
import logger from "./middleware/log.middleware.mjs";

enableLog();

const port = 8080;



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "Test",
    saveUninitialized: false,
    cookie: { maxAge: oneDay, httpOnly: false},
    resave: false 
}));

app.set("view engine", "ejs");

app.use("/", logger);

app.use("/", router);

app.get("/test", (req, res) => {
    res.sendStatus(200);
})

app.use('/', express.static(
    join(__dirname, 'app'),
    {
        extensions: ['html', 'htm']
    }
));

const server = app.listen(port, () => {
    log("Server", `Listening on port: ${port}`);
});