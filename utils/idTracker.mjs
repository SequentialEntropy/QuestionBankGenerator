import { log } from "./logger.mjs";

import { jsonReader } from "./jsonReader.mjs";

const defaults = {
    nextId: 0,
    list: []
}

class Tracker {
    constructor(jsonRW) {
        this._jsonRW = jsonRW;
        
        this._log("Initialised");
    }
    static async init(filePath) {
        let jsonRW = jsonReader.init(filePath, defaults);
        return new Tracker(await jsonRW);
    }
    _data() {
        return this._jsonRW.data;
    }
    _save() {
        this._jsonRW.save();
    }
    create() {
        this._log("create() function called");

        const id = this._data().nextId;
        this._data().nextId++;
        this._log("Updated nextId", this._data().nextId);
        
        if (this._data().list.includes(id)) {
            this._log("Detected existing ID", id);
            return id;
        }

        this._data().list.push(id);
        this._log("Pushed new ID", id);

        this._save();

        return id;
    }
    remove(id) {
        this._log(`remove(${id}) function called`);

        const index = this._data().list.indexOf(id);
        this._data().list.splice(index, 1);
        this._log("Spliced index", index);

        Tracker._writeToFile(this._save(), this._data()._filePath);
        this._log("Updated file to reflect removed ID", id);
    }
    _log(text, postfix=false) {
        log(`ID Tracker ${this._jsonRW.fileName()}`, text, postfix);
    }
}

export { Tracker }