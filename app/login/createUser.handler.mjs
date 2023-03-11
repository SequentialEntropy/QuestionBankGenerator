import { getUserByName, getUserIdByName, createUser as cU} from "../user/user.mjs";

import bcrypt from "bcrypt";

import { log } from "../../utils/logger.mjs";

export default async function createUser(req, res) {

    let user = await getUserByName(req.body.username);

    if (user) {
        req.session.isTaken = true;
        res.redirect("/login/signup");
        return
    }

    if (req.body.password != req.body.confirmPassword) {
        req.session.notMatching = true;
        res.redirect("/login/signup");
        return
    }

    if (req.body.username == "" || req.body.password == "" || req.body.confirmPassword == "") {
        req.session.hasEmpty = true;
        res.redirect("/login/signup");
        return
    }

    req.session.isTaken = undefined;
    req.session.notMatching = undefined;
    req.session.hasEmpty = undefined;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUserInstance = await cU({
        username: req.body.username,
        password: hashedPassword
    });

    req.session.userId = newUserInstance.getId();

    req.session.isInvalid = false;
    log("Auth", req.session.userId);

    res.redirect("/");
}