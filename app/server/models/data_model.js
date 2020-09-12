class DataModel {
    constructor(){
        this.data = [];
        this.errors = [];
    }

    getAll(){
        return this.data;
    }

    getById(id){
        for (const obj of this.data) {
            if (obj.id === id){
                return obj;
            }
        };
        return null;
    }

    getIndexOf(id){
        let index = -1;

        for (const obj of this.data) {
            index++;
            if (obj.id === id){
                return index;
            }
        };
        return index;
    }

    save(obj){
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id){
        const index = this.getIndexOf(id);
        this.errors = [];

        if(index > -1) {
            const temp = this.data[index];
            for (const property in obj) {
                temp[property] = obj[property];
            }

            this.data[index] = temp; 
            return true;
        }

        this.errors.push("object id not found");
        return false;
    }

    delete(id){
        let index = this.getIndexOf(id);
        if (index > -1){
            this.data.splice(index, 1);
            return true;
        }
        return false; 
    }

    validate(obj){
        // this method will be overriden in the sub classes
        return true;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;