import { dirname, join } from "path";
import { fileURLToPath } from "url";

import express from "express";
import sessions from "express-session";

import bcrypt from "bcrypt";

import { getUserByName, getUserIdByName } from "../users/user.mjs";

import { log, enableLog } from "../logger.mjs";
import { router as questionRouter } from "./routes/questionRouter.mjs";

enableLog();

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

const app = express();
const port = 8080;

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "Test",
    saveUninitialized: false,
    cookie: { maxAge: oneDay, httpOnly: false},
    resave: false 
}));

// Parse POST json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// Log all incoming requests
app.use('/', (req, res, next) => {
    log("Listener", req.url);
    next();
});

app.use("/question", questionRouter);






app.get('/', (req, res) => {
    if (req.session.hasOwnProperty("userId")) {
        res.render("pages/dashboard", {
            userId: req.session.userId,
            sessionId: req.sessionID
        });
    } else {
        res.redirect("/login");
    }
})

app.post("/auth", async (req, res) => {
    let user = await getUserByName(req.body.username);

    if (!user) {
        req.session.isInvalid = true;
        res.redirect("/login");
        return
    }

    bcrypt.compare(req.body.password, user.getPasswordHash(), (err, validCredentials) => {
        if (validCredentials) {
            req.session.userId = getUserIdByName(req.body.username);
            req.session.isInvalid = false;
            log("Auth", req.session.userId);
            res.redirect("/");
        } else {
            req.session.isInvalid = true;
            res.redirect("/login");
        }
    })
})

app.get("/login", (req, res) => {
    res.render("pages/login", {
        isInvalid: req.session.isInvalid
    });
})

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
})

app.get("/stop", (req, res) => {
    res.send("Server Closing");
    res.end();
    server.close(() => {
        log("Server", "Closed");
    });
    return;
})

app.use('/', express.static(
    join(__dirname, 'public'),
    {
        extensions: ['html', 'htm']
    }
));

const server = app.listen(port, () => {
    log("Server", `Listening on port: ${port}`);
});