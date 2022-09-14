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
    }
    static async init(options, logEnabled=false) {
        let filePath;
        let data = defaults;
        if (options.hasOwnProperty("id")) {
            filePath = join(__dirname, "classroomFiles", `classroom${options.id.toString()}.json`);
            data = await Classroom._readFromFile(filePath);
        } else {
            options.id = counter.create();
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
    readFromFile(filePath) {
        let classroomRawData = fs.readFileSync(filePath);
        let classroomParsed = JSON.parse(classroomRawData);
        this._id = classroomParsed.id || defaults.id;
        this._name = classroomParsed.name || defaults.name;
        this._description = classroomParsed.description || defaults.description;
        this._sets = classroomParsed.sets || defaults.sets;
        this._owner = classroomParsed.owner || defaults.owner;
        this._teachers = classroomParsed.teachers || defaults.teachers;
        this._students = classroomParsed.students || defaults.students;
    }
    writeToFile(filePath) {
        let classroomData = {
            id: this._id,
            name: this._name,
            description: this._description,
            sets: this._sets,
            owner: this._owner,
            teachers: this._teachers,
            students: this._students
        };
        let classroomRawData = JSON.stringify(classroomData, null, 4);
        fs.writeFileSync(filePath, classroomRawData);
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
        this._sets = data.sets;
        this._owner = data.owner;
        this._teachers = data.teachers;
        this._students = data.students;
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

const counter = await Tracker.init(join(__dirname, "classroomList.json"));
export { Classroom };