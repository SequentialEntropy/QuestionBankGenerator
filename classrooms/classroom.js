const fs = require("fs");
const path = require("path");

const defaults = {
    id: -1,
    name: "New Classroom",
    description: "",
    sets: [],
    owner: -1,
    teachers: [],
    students: []
}

class ClassroomList {
    constructor(filePath = "classroomList.json") {
        this.filePath = path.join(__dirname, filePath);
        try {
            this.readFromFile(this.filePath);
        } catch (err) {
            if (err.code === "ENOENT") {
                this.nextId = 0;
                this.list = [];
                this.writeToFile(this.filePath);
            } else {
                throw err;
            }
        }
    }
    newClassroom() {
        let id = this.nextId;
        this.nextId++;
        if (this.list.includes(id)) {
            return id;
        }
        this.list.push(id);
        this.writeToFile(this.filePath);
        return id;
    }
    removeClassroom(id) {
        let index = this.list.indexOf(id);
        this.list.splice(index, 1);
        this.writeToFile(this.filePath);
    }
    readFromFile(filePath) {
        let classroomListRawData = fs.readFileSync(filePath);
        let classroomListParsed = JSON.parse(classroomListRawData);
        this.nextId = classroomListParsed.nextId || 0;
        this.list = classroomListParsed.list || [];
    }
    writeToFile(filePath) {
        let classroomListData = {
            nextId: this.nextId,
            list: this.list
        };
        let classroomListRawData = JSON.stringify(classroomListData, null, 4);
        fs.writeFileSync(filePath, classroomListRawData);
    }
}

const counter = new ClassroomList();

class Classroom {
    constructor(options) {
        if (options.id) {
            this.filePath = path.join(__dirname, "classroomFiles", `classroom${options.id.toString()}.json`);
            this.readFromFile(this.filePath);
        } else {
            this.id = counter.newClassroom();
            this.name = options.name || defaults.name;
            this.description = options.description || defaults.description;
            this.sets = options.sets || defaults.sets;
            this.owner = options.owner || defaults.owner;
            this.teachers = options.teachers || defaults.teachers;
            this.students = options.students || defaults.students;
            this.filePath = path.join(__dirname, "classroomFiles", `classroom${this.id.toString()}.json`);
            this.writeToFile(this.filePath);
        }
    }
    readFromFile(filePath) {
        let classroomRawData = fs.readFileSync(filePath);
        let classroomParsed = JSON.parse(classroomRawData);
        this.id = classroomParsed.id || defaults.id;
        this.name = classroomParsed.name || defaults.name;
        this.description = classroomParsed.description || defaults.description;
        this.sets = classroomParsed.sets || defaults.sets;
        this.owner = classroomParsed.owner || defaults.owner;
        this.teachers = classroomParsed.teachers || defaults.teachers;
        this.students = classroomParsed.students || defaults.students;
    }
    writeToFile(filePath) {
        let classroomData = {
            id: this.id,
            name: this.name,
            description: this.description,
            sets: this.sets,
            owner: this.owner,
            teachers: this.teachers,
            students: this.students
        };
        let classroomRawData = JSON.stringify(classroomData, null, 4);
        fs.writeFileSync(filePath, classroomRawData);
    }
}

let a = new Classroom({ id: 12345 });
console.log(a);
let b = new Classroom({
    name: "Computer Science",
    description: "A new classroom",
    sets: [],
    owner: 12345,
    teachers: [],
    students: []
})
console.log(b);