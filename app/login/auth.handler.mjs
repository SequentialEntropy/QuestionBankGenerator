import { getUserByName, getUserIdByName } from "../user/user.mjs";

import bcrypt from "bcrypt";

import { log } from "../../utils/logger.mjs";

export default async function auth(req, res) {
    // Get user instance
    let user = await getUserByName(req.body.username);
    
    // Check if user does not exist
    if (!user) {
        req.session.isInvalid = true;
        res.redirect("/login");
        return
    }

    // Check if the hash of the entered password matches the hash stored in the database
    bcrypt.compare(req.body.password, user.getPasswordHash(), (err, validCredentials) => {
        if (validCredentials) {
            // Hash matched
            // Store the user ID into the user's session
            req.session.userId = getUserIdByName(req.body.username);
            req.session.isInvalid = false;
            log("Auth", req.session.userId);
            // Check if user's last visited page is stored in the session
            if (!req.session.redirect) {
                // If not, redirect to dashboard
                res.redirect("/");
            } else {
                // If found, redirect user to the page they were last on
                const address = req.session.redirect;
                delete req.session.redirect;
                res.redirect(address);
            }
        } else {
            // Hash did not match
            req.session.isInvalid = true;
            res.redirect("/login");
        }
    })
}