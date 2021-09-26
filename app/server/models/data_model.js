class DataModel {
    constructor() {
        this.data = [];
        this.errors = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        var result = this.data.find(obj => {
            return obj.id === id
          }) || null
        return result;
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }
    
    update(obj, id) {
        let found = false;
        for (let user of this.data) {
            for (let prop in user) {
                if (user[prop] === id) {
                    found = true;
                    Object.assign(user,obj);
                }
            }
        }
        
        if (found === true) {
            return true;
         
        }
    }
    delete(id) {
        
        let found = false;

        for (let obj of this.data) {
            for (let prop in obj) {
                if (obj[prop] === id) {
                    found = true;
                    this.data = this.data.filter(user => user.id != id)                }
            }
        }
        if (found === true) {
            return true;
        }

    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;