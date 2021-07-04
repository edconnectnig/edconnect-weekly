const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy){
        this.id = id;
        this.name = name; 
        this.abstract = abstract; 
        this.authors = authors;
        this.tags = tags;
        this.createdBy = createdBy;
    }
}

class Projects extends DataModel {
    validate(obj){
        this.errors = [];
        
        for (const property in obj) {
            if(["authors", "tags"].includes(property)){
                if(!Array.isArray(obj[property])){
                    this.errors.push(`${property} should be an array`)
                }
            } else {
                if(obj[property] === ""){
                    this.errors.push(`${property} should not be empty`)
                }
            }
        }

        return this.errors.length > 0 ? false : true;
    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};