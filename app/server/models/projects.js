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
        for (const property in obj) {
            if(["authors", "tags"].includes(property)){
                if(!Array.isArray(obj[property])){
                    console.log(`${property} should be an array`)
                    return false;
                }
            } else {
                if(obj[property] === ""){
                    console.log(`${property} should not be empty`)
                    return false;
                }
            }
        }

        if (this.getById(obj.id)){
            console.log(`A project with ID ${obj.id} already exists`);
            return false;
        }

        return true;
    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};