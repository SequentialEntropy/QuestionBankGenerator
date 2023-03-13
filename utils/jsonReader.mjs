import { promises as fs } from "fs";

import { log } from "../utils/logger.mjs";

class jsonReader {
    constructor(data, filePath) {
        this._filePath = filePath;
        // Store loaded JSON as a class property
        this.data = data;
        this._log("Initialised");
    }
    static async init(filePath, defaults={}) { // Asynchronously initialise class instance
        let data = defaults;
        try {
            data = await jsonReader._readFromFile(filePath);
            log(`jsonReader ${getFileName(filePath)}`, "Existing file found");
        } catch (err) {
            if (err.code === "ENOENT") { // File not found
                log(`jsonReader ${getFileName(filePath)}`, "File not found");
                jsonReader._writeToFile(data, filePath); // Create new file
                log(`jsonReader ${getFileName(filePath)}`, "Created default file", filePath);
            } else {
                throw err;
            }
        };
        return new jsonReader(data, filePath); // Return class instance
    }
    static async _readFromFile(filePath) { // Read from file, parse JSON
        log(`jsonReader ${getFileName(filePath)}`, "Reading from file...", filePath);
        const rawData = await fs.readFile(filePath);
        const data = JSON.parse(rawData);
        log(`jsonReader ${getFileName(filePath)}`, "Reading from file successful");
        return data;
    }
    async load() { // Store file data into memory
        this._log("load() function called");
        this.data = jsonReader._readFromFile(this._filePath);
        this._log("Read stored data from file", this.data);
    }
    static async _writeToFile(data, filePath) { // Stringify and write JSON data into file
        const rawData = JSON.stringify(await data, null, 4);
        return fs.writeFile(filePath, rawData);
    }
    async save() { // Store data into file
        this._log("save() function called");
        jsonReader._writeToFile(this.data, this._filePath);
        this._log("Wrote stored data to file", this.data);
    }
    static _deleteFile(filePath) {
        fs.unlink(filePath);
    }
    async delete() { // Delete this file
        jsonReader._deleteFile(this._filePath);
    }
    fileName() {
        return getFileName(this._filePath);
    }
    _log(text, postfix=false) { // Console logger
        log(`jsonReader ${this.fileName()}`, text, postfix);
    }
}

function getFileName(filePath) {
    return filePath.split("/").pop().split("\\").pop()
}

export { jsonReader };