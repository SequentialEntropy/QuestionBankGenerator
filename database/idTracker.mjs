import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

const defaults = {
    nextId: 0,
    list: []
}

class Tracker {
    constructor(data, filePath) {
        this._filePath = filePath;
        this._load(data);
    };
    static async init(filePath) {
        let data;
        try {
            data = await Tracker._readFromFile(filePath);
        } catch (err) {
            if (err.code === "ENOENT") { // File not found
                data = defaults;
                console.log(`\nCreating default file ${filePath}\n`);
                Tracker._writeToFile(data, filePath);
            } else {
                throw err;
            }
        };
        return new Tracker(data, filePath);
    }
    create() {
        const id = this._nextId;
        this._nextId++;
        if (this._list.includes(id)) {
            return id;
        }
        this._list.push(id);
        console.log(`\nCreating ${id.toString()}\n`);
        Tracker._writeToFile(this._save(), this._filePath);
        return id;
    }
    remove(id) {
        const index = this._list.indexOf(id);
        this._list.splice(index, 1);
        Tracker._writeToFile(this._save(), this._filePath);
    }
    static async _readFromFile(filePath) {
        const rawData = await fs.readFile(filePath);
        const data = JSON.parse(rawData);
        return data;
    }
    async _load(data) {
        this._nextId = data.nextId;
        this._list = data.list;
    }
    static async _writeToFile(data, filePath) {
        const rawData = JSON.stringify(await data, null, 4);
        console.log(`\nTracker Saving to ${filePath}\n${rawData}\n`)
        return fs.writeFile(filePath, rawData);
    }
    async _save() {
        return {
            nextId: this._nextId,
            list: this._list
        };
    }
}

export { Tracker };