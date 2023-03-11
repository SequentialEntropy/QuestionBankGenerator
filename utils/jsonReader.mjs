import { promises as fs } from "fs";

import { log } from "../utils/logger.mjs";

class jsonReader {
    constructor(data, filePath) {
        this._filePath = filePath;
        this.data = data;

        this._log("Initialised");
    }
    static async init(filePath, defaults={}) {
        let data = defaults;
        try {
            data = await jsonReader._readFromFile(filePath);
            log(`jsonReader ${getFileName(filePath)}`, "Existing file found");
        } catch (err) {
            if (err.code === "ENOENT") { // File not found
                log(`jsonReader ${getFileName(filePath)}`, "File not found");
                jsonReader._writeToFile(data, filePath);
                log(`jsonReader ${getFileName(filePath)}`, "Created default file", filePath);
            } else {
                throw err;
            }
        };
        return new jsonReader(data, filePath);
    }
    static async _readFromFile(filePath) {
        log(`jsonReader ${getFileName(filePath)}`, "Reading from file...", filePath);
        const rawData = await fs.readFile(filePath);
        const data = JSON.parse(rawData);
        log(`jsonReader ${getFileName(filePath)}`, "Reading from file successful");
        return data;
    }
    async load() {
        this._log("load() function called");
        this.data = jsonReader._readFromFile(this._filePath);
        this._log("Read stored data from file", this.data);
    }
    static async _writeToFile(data, filePath) {
        const rawData = JSON.stringify(await data, null, 4);
        return fs.writeFile(filePath, rawData);
    }
    static _deleteFile(filePath) {
        fs.unlink(filePath);
    }
    async save() {
        this._log("save() function called");
        jsonReader._writeToFile(this.data, this._filePath);
        this._log("Wrote stored data to file", this.data);
    }
    async delete() {
        jsonReader._deleteFile(this._filePath);
    }
    fileName() {
        return getFileName(this._filePath);
    }
    _log(text, postfix=false) {
        log(`jsonReader ${this.fileName()}`, text, postfix);
    }
}

function getFileName(filePath) {
    return filePath.split("/").pop().split("\\").pop()
}

export { jsonReader };