import { dirname, join } from "path";
import { fileURLToPath } from "url";

import express from "express";
import cookieParser from "cookie-parser";
import sessions from "express-session";

import { getUserByName } from "../users/user.mjs";

import { log, enableLog } from "../logger.mjs";

enableLog();

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

const app = express();
const port = 8080;

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "Test",
    saveUninitialized: true,
    cookie: { maxAge: oneDay, httpOnly: false},
    resave: false 
}));

// Parse POST json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Log all incoming requests
app.use('/', (req, res, next) => {
    log("Listener", req.url);
    next();
});

app.get('/', (req, res) => {
    let currentSession = req.session;
    if (currentSession.userid) {
        // res.sendFile(join(__dirname, "public", "dashboard.html"));
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dashboard</title>
        </head>
        <body>
            <h1>Welcome Back, ${currentSession.userid}</h1>
            <a href="/logout">Logout</a>
        </body>
        </html>
        `)
    } else {
        res.redirect("/login");
    }
})

app.post("/auth", async (req, res) => {
    if ((await getUserByName(req.body.username)).getPasswordHash() == req.body.password) {
        let currentSession = req.session;
        currentSession.userid = req.body.username;
        log("Auth", req.session.userid);
        res.redirect("/");
    } else {
        res.send("Invalid credentials");
    }
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