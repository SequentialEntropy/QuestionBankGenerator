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
    username: "New User",
    email: "",
    password: "0x0",
    questions: [],
    sets: []
};

class User {
    constructor(data, filePath, logEnabled) {
        this._filePath = filePath;
        this._load(data);
        this._logEnabled = logEnabled;
    }
    static async init(options, logEnabled=false) {
        let filePath;
        let data = defaults;
        if (options.hasOwnProperty("id")) { // Load existing user by id
            filePath = join(__dirname, "userFiles", `user${options.id.toString()}.json`);
            data = await User._readFromFile(filePath);
        } else { // Create new user by fields and auto id
            options.id = counter.create();
            filePath = join(__dirname, "userFiles", `user${options.id.toString()}.json`);
            data.id = options.id;
            data.username = options.username;
            data.email = options.email;
            data.password = options.password;
            data.questions = options.questions;
            data.sets = options.sets;
            User._writeToFile(data, filePath);
        }
        return new User(data, filePath, logEnabled);
    }
    static async _readFromFile(filePath) {
        const rawData = await fs.readFile(filePath);
        const data = JSON.parse(rawData);
        return data;
    }
    async _load(data) {
        this._id = data.id;
        this._username = data.username;
        this._email = data.email;
        this._password = data.password;
        this._questions = data.questions;
        this._sets = data.sets;
    }
    static async _writeToFile(data, filePath) {
        const rawData = JSON.stringify(await data, null, 4);
        return fs.writeFile(filePath, rawData);
    }
    async _save() {
        return {
            id: this._id,
            username: this._username,
            email: this._email,
            password: this._password,
            questions: this._questions,
            sets: this._sets
        };
    }
    _log(text) {
        if (this._logEnabled) {
            log(`User ${this._id}`, text, this._filePath);
        }
    }
}

const counter = await Tracker.init(join(__dirname, "userList.json"));
export { User };