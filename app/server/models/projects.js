const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy) {
        this.id = id
        this.name = name
        this.abstract = abstract
        this.authors = authors
        this.tags = tags
        this.createdBy = createdBy
    }
}

class Projects extends DataModel {
validate(obj) {
        this.errors = [];
        for (let prop in obj) {
            if (obj[prop].length == 0) {
                this.errors.push(`${prop} should not be empty`)
            } 
        }
        if (Array.isArray(obj.authors) === false || obj.authors === "") {
            this.errors.push("Authors should be an array");
        } 
        if (Array.isArray(obj.tags) === false || obj.tags === "") {
            this.errors.push("Tags should be an array");
        
        } 

    

        if (this.errors.length == 0) {
            return true;
        } else {
            return false;
        }
    }
}
// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};