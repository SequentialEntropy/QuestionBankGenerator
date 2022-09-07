import { dirname, join } from "path";
import { fileURLToPath } from "url";

import express from "express";
import cookieParser from "cookie-parser";
import sessions from "express-session";

import { logger, log } from "./logger.mjs";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

const app = express();
const port = 8080;

const oneDay = 1000 * 60 * 60 * 24;

//username and password
const testUsername = 'test'
const testPassword = 'test'

// a variable to save a session
let testSession;

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
app.use('/', logger);

app.get('/', (req, res) => {
    testSession = req.session;
    if (testSession.userid) {
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
            <h1>Welcome Back, ${testSession.userid}</h1>
            <a href="/logout">Logout</a>
        </body>
        </html>
        `)
    } else {
        res.redirect("/login");
    }
})

app.post("/auth", (req, res) => {
    if (req.body.username == testUsername && req.body.password == testPassword) {
        testSession = req.session;
        testSession.userid = req.body.username;
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

app.use('/', express.static(
    join(__dirname, 'public'),
    {
        extensions: ['html', 'htm']
    }
));

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});