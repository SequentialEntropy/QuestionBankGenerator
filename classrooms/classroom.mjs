import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Tracker } from "../database/idTracker.mjs";
import { log } from "../logger.mjs";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

const defaults = {
    id: -1,
    name: "New Classroom",
    description: "",
    sets: [],
    owner: -1,
    teachers: [],
    students: []
};

class Classroom {
    constructor(data, filePath, logEnabled) {
        this._filePath = filePath;
        this._load(data);
        this._logEnabled = logEnabled;

        this._log("Initialised");
    }
    static async init(options, logEnabled=false) {
        log("Classroom static", "Initialising Classroom");
        let filePath;
        let data = defaults;
        if (options.hasOwnProperty("id")) {
            log("Classroom static", `ID ${options.id} passed when initialising`);
            filePath = join(__dirname, "classroomFiles", `classroom${options.id.toString()}.json`);
            data = await Classroom._readFromFile(filePath);
        } else {
            log("Classroom static", "ID not passed when initialising");
            options.id = counter.create();
            log("Classroom static", `New ID ${options.id} generated`);
            filePath = join(__dirname, "classroomFiles", `classroom${options.id.toString()}.json`);
            data.id = options.id;
            data.name = options.name;
            data.description = options.description;
            data.sets = options.sets;
            data.owner = options.owner;
            data.teachers = options.teachers;
            data.students = options.students;
            Classroom._writeToFile(data, filePath);
        }
        return new Classroom(data, filePath, logEnabled);
    }
    static async _readFromFile(filePath) {
        log("Classroom static", "Read function called", filePath);

        const rawData = await fs.readFile(filePath);
        log("Classroom static", "File read", rawData);
        const data = JSON.parse(rawData);
        log("Classroom static", "String -> JSON - Parsed read file", data);

        return data;
    }
    async _load(data) {
        this._log("Load function called");

        this._id = data.id;
        this._name = data.name;
        this._description = data.description;
        this._sets = data.sets;
        this._owner = data.owner;
        this._teachers = data.teachers;
        this._students = data.students;

        this._log("Load done");
    }
    static async _writeToFile(data, filePath) {
        log("Classroom static", "Write function called", filePath);

        const rawData = JSON.stringify(await data, null, 4);
        log("Classroom static", "JSON -> String - Prepared stringified data for writing");
        fs.writeFile(filePath, rawData);
        log("Classroom static", "File written", filePath);
    }
    async _save() {
        this._log("Save function called");
        return {
            id: this._id,
            name: this._name,
            description: this._description,
            sets: this._sets,
            owner: this._owner,
            teachers: this._teachers,
            students: this._students
        };
    }
    _log(text) {
        if (this._logEnabled) {
            log(`Classroom ${this._id}`, text, this._filePath);
        }
    }
}

const counter = await Tracker.init(join(__dirname, "classroomList.json"), true);
export { Classroom };