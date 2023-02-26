import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

export default function question(req, res) {
    res.render(`${__dirname}/client/question.views.ejs`);
}