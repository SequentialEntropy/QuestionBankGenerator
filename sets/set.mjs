import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Tracker } from "../database/idTracker.mjs";
import { log } from "../logger.mjs";

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
    constructor(data, filePath, logEnabled) {
        this._filePath = filePath;
        this._load(data);
        this._logEnabled = logEnabled;

        this._log("Initialised");
    }
    static async init(options, logEnabled=false) {
        log("Set static", "Initialising User");
        let filePath;
        let data = defaults;
        if (options.hasOwnProperty("id")) { // Load existing set by id
            log("Set static", `ID ${options.id} passed when initialising`);
            filePath = join(__dirname, "setFiles", `set${options.id.toString()}.json`);
            data = await Set._readFromFile(filePath);
        } else { // Create new set by fields and auto id
            log("Set static", "ID not passed when initialising");
            options.id = counter.create();
            log("Set static", `New ID ${options.id} generated`);
            filePath = join(__dirname, "setFiles", `set${options.id.toString()}.json`);
            data.id = options.id;
            data.name = options.name;
            data.description = options.description;
            data.questions = options.questions;
            Set._writeToFile(data, filePath);
        }
        return new Set(data, filePath, logEnabled);
    }
    static async _readFromFile(filePath) {
        log("Set static", "Read function called", filePath);

        const rawData = await fs.readFile(filePath);
        log("Set static", "File read", rawData);
        const data = JSON.parse(rawData);
        log("Set static", "String -> JSON - Parsed read file", data);

        return data;
    }
    async _load(data) {
        this._log("Load function called");

        this._id = data.id;
        this._name = data.name;
        this._description = data.description;
        this._questions = data.questions;

        this._log("Load done");
    }
    static async _writeToFile(data, filePath) {
        log("Set static", "Write function called", filePath);

        const rawData = JSON.stringify(await data, null, 4);
        log("Set static", "JSON -> String - Prepared stringified data for writing");
        fs.writeFile(filePath, rawData);
        log("Set static", "File written", filePath);
    }
    async _save() {
        this._log("Save function called");
        return {
            id: this._id,
            name: this._name,
            description: this._description,
            questions: this._questions
        };
    }
    _log(text) {
        if (this._logEnabled) {
            log(`Set ${this._id}`, text, this._filePath);
        }
    }
}

const counter = await Tracker.init(join(__dirname, `setList.json`));
export { Set };