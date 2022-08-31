import { dirname, join } from "path";
import { fileURLToPath } from "url";

import express from "express";
import { logger } from "./logger.mjs";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

const app = express();
const port = 8080;

app.use('/', logger);

app.use('/', express.static(
    join(__dirname, 'public'),
    {
        extensions: ['html', 'htm']
    }
));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, "public", "index.html"));
})

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});