import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Tracker } from "../database/idTracker.mjs";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

const defaults = {
    id: 12345,
    name: "Example Set",
    description: "An example set description.",
    questions: [
        12345,
        55555,
        98765
    ]
};

class Set {
    constructor(data, filePath) {
        this._filePath = filePath;
        this._load(data);
    }
    static async init(options) {
        let filePath;
        let data = defaults;
        if (options.hasOwnProperty("id")) { // Load existing set by id
            filePath = join(__dirname, "setFiles", `set${options.id.toString()}.json`);
            data = await Set._readFromFile(filePath);
        } else { // Create new set by fields and auto id
            options.id = counter.create();
            filePath = join(__dirname, "setFiles", `set${options.id.toString()}.json`);
            data.id = options.id;
            data.name = options.name;
            data.description = options.description;
            data.questions = options.questions;
            Set._writeToFile(data, filePath);
        }
        return new Set(data, filePath);
    }
    static async _readFromFile(filePath) {
        const rawData = await fs.readFile(filePath);
        const data = JSON.parse(rawData);
        return data;
    }
    async _load(data) {
        this._id = data.id;
        this._name = data.name;
        this._description = data.description;
        this._questions = data.questions;
    }
    static async _writeToFile(data, filePath) {
        const rawData = JSON.stringify(await data, null, 4);
        return fs.writeFile(filePath, rawData);
    }
    async _save() {
        return {
            id: this._id,
            name: this._name,
            description: this._description,
            questions: this._questions
        };
    }
}

const counter = await Tracker.init(join(__dirname, `setList.json`));
export { Set };