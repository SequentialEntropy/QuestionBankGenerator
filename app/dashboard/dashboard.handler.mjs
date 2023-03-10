import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

export default function dashboard(req, res) {
    if (req.session.hasOwnProperty("userId")) {
        res.render(`${__dirname}/dashboard.views.ejs`, {
            userId: req.session.userId,
            sessionId: req.sessionID
        });
    } else {
        res.redirect("/login");
    }
}