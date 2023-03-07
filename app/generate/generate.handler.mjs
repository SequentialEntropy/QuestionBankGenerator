import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

export default function generate(req, res) {
    res.render(`${__dirname}/client/generate.views.ejs`);
}