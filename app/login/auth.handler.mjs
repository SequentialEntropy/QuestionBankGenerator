import { getUserByName, getUserIdByName } from "../user/user.mjs";

import bcrypt from "bcrypt";

import { log } from "../../utils/logger.mjs";

export default async function auth(req, res) {

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
            if (!req.session.redirect) {
                res.redirect("/");
            } else {
                const address = req.session.redirect;
                delete req.session.redirect;
                res.redirect(address);
            }
        } else {
            req.session.isInvalid = true;
            res.redirect("/login");
        }
    })
}