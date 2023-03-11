import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

export default function signup(req, res) {
    res.render(`${__dirname}/client/signup.views.ejs`, {
        isTaken: req.session.isTaken,
        notMatching: req.session.notMatching,
        hasEmpty: req.session.hasEmpty
    });
    req.session.isTaken = undefined;
    req.session.notMatching = undefined;
    req.session.hasEmpty = undefined;
}