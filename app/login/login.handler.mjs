import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

export default function login(req, res) {
    res.render(`${__dirname}/login.views.ejs`, {
        isInvalid: req.session.isInvalid
    });
}