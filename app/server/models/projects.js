const DataModel = require('./data_model');
const util = require('../utils');

class Project {
    constructor(name, abstract, authors, tags, createdBy){
        this.name = name; 
        this.abstract = abstract; 
        this.authors = authors;
        this.tags = tags;
        this.createdBy = createdBy;
        this.id = util.generate_random_id();
    }
}

class Projects extends DataModel {
    validate(obj){
        for (const property in obj) {
            if(["authors", "tags"].includes(property)){
                if(!Array.isArray(obj[property])){
                    return {
                        status: "error",
                        error: `${property} should be an array`
                    };
                }
            } else {
                if(obj[property] === ""){
                    return {
                        status: "error",
                        error: `${property} should not be empty`
                    };
                }
            }
        }

        return {
            status: "ok",
            error: null
        };
    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};