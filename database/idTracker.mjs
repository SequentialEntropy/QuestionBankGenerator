import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { log } from "../logger.mjs";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

const defaults = {
    nextId: 0,
    list: []
}

class Tracker {
    constructor(data, filePath, logEnabled) {
        this._filePath = filePath;
        this._load(data);
        this._logEnabled = logEnabled;

        this._log("Initialised");
    };
    static async init(filePath, logEnabled=false) {
        log("ID Tracker static", "Initialising Tracker");
        let data = defaults;
        try {
            data = await Tracker._readFromFile(filePath);
        } catch (err) {
            if (err.code === "ENOENT") { // File not found
                log("ID Tracker static", "File not found");
                Tracker._writeToFile(data, filePath);
                log("ID Tracker static", "Created default file", filePath);
            } else {
                throw err;
            }
        };
        return new Tracker(data, filePath, logEnabled);
    }
    create() {
        this._log("Create function called");

        const id = this._nextId;
        this._nextId++;
        this._log(`Updated nextId to ${this._nextId}`);
        
        if (this._list.includes(id)) {
            this._log(`Detected existing ID ${id}`);
            return id;
        }

        this._list.push(id);
        this._log(`Pushed new ID ${id}`);

        Tracker._writeToFile(this._save(), this._filePath);
        return id;
    }
    remove(id) {
        this._log("Remove function called");

        const index = this._list.indexOf(id);
        this._list.splice(index, 1);
        this._log(`Spliced index ${index}`);

        Tracker._writeToFile(this._save(), this._filePath);
        this._log(`Updated file to reflect removed ID ${id}`);
    }
    static async _readFromFile(filePath) {
        log("ID Tracker static", "Read function called");

        const rawData = await fs.readFile(filePath);
        log("ID Tracker static", "File read", rawData);
        const data = JSON.parse(rawData);
        log("ID Tracker static", "String -> JSON - Parsed read file", data);
        
        return data;
    }
    async _load(data) {
        this._log("Load function called");

        this._nextId = data.nextId;
        this._list = data.list;

        this._log("Load done");
    }
    static async _writeToFile(data, filePath) {
        log("ID Tracker static", "Write function called", filePath);

        const rawData = JSON.stringify(await data, null, 4);
        log("ID Tracker static", "JSON -> String - Prepared stringified data for writing");
        fs.writeFile(filePath, rawData);
        log("ID Tracker static", "File written", filePath);
    }
    async _save() {
        this._log("Save function called");
        return {
            nextId: this._nextId,
            list: this._list
        };
    }
    _log(text) {
        if (this._logEnabled) {
            log(`ID Tracker`, text, this._filePath);
        }
    }
}

export { Tracker };