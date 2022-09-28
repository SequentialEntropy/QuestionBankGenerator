import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);

const __dirname = dirname(__filename);

import { log } from "../logger.mjs";

import { Tracker } from "../database/idTracker.mjs";
import { jsonReader } from "../database/jsonReader.mjs";

const defaults = {
    id: -1,
    username: "New User",
    password: "0x0",
    questions: [],
    sets: []
};

class User {
    constructor(jsonRW) {
        this._jsonRW = jsonRW;

        this._log("Initialised");
    }
    static async init(options) {
        if (!("id" in options)) {
            log("User", "ID not specified");
            options = Object.assign(defaults, options);
            if (options.username in nameToId.data) {
                log("User", "Entered username already exists", options.username);
                return false;
            }
            options.id = counter.create();
            nameToId.data[options.username] = options.id;
            nameToId.save();
            log(`User user${options.id}.json`, "Creating new user");
        }
        let jsonRW = jsonReader.init(join(__dirname, "userFiles", `user${options.id}.json`), options);
        return new User(await jsonRW);
    }
    _data() {
        return this._jsonRW.data;
    }
    _save() {
        this._jsonRW.save();
    }
    _log(text, postfix=false) {
        log(`User user${this._data().id}.json`, text, postfix);
    }

    getPasswordHash() {
        return this._data().password;
    }
    getQuestions() {
        return this._data().questions;
    }
    getSets() {
        return this._data().sets;
    }
}

function getUserByName(username) {
    return getUserById(getIdByName(username));
}

function getUserById(id) {
    if (id in counter._data().list) {
        return User.init({ id: id });
    }
    return false;
}

function getIdByName(username) {
    if (username in nameToId.data) {
        return nameToId.data[username];
    }
    return false;
}

const counter = await Tracker.init(join(__dirname, "userList.json"));
const nameToId = await jsonReader.init(join(__dirname, "nameToId.json"));
export { User, getUserByName, getUserById, getIdByName };