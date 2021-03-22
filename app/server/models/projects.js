const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy) {
        this.id = id;
        this.name = name;
        this.abstract = abstract;
        this.authors = authors;
        this.tags = tags;
        this.createdBy = createdBy;
    }
}

class Projects extends DataModel {
    validate(obj) {
 
        let sta1 = true;
        for (const item in obj) {
            if (!obj[item] || obj[item] === null) {
                sta1 = false;
            }
        }
        let arrayAuthors = Array.isArray(obj.authors);
        let arrayTags = Array.isArray(obj.tags);
        if (arrayAuthors && arrayTags && sta1) {
            return true
        }
        return false;
}
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};