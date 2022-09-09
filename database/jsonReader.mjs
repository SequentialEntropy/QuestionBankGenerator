import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

const defaults = {}

class jsonReader {
    constructor(data, filePath) {
        this._filePath = filePath;
        this.data = data;
    }
    static async init(filePath) {
        let data;
        try {
            data = await jsonReader._readFromFile(filePath);
        } catch (err) {
            if (err.code === "ENOENT") { // File not found
                data = defaults;
                console.log(`\nCreating default file ${filePath}\n`);
                jsonReader._writeToFile(data, filePath);
            } else {
                throw err;
            }
        };
        return new jsonReader(data, filePath);
    }
    static async _readFromFile(filePath) {
        const rawData = await fs.readFile(filePath);
        const data = JSON.parse(rawData);
        return data;
    }
    async load() {
        this.data = jsonReader._readFromFile(this._filePath);
    }
    static async _writeToFile(data, filePath) {
        const rawData = JSON.stringify(await data, null, 4);
        console.log(`\nTracker Saving to ${filePath}\n${rawData}\n`);
        return fs.writeFile(filePath, rawData);
    }
    async save() {
        jsonReader._writeToFile(this.data, this._filePath);
    }
}

export { jsonReader };