class DataModel {
    constructor(){
        this.data = [];
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
        const validate = this.validate(obj);

        if (validate.status === "ok") {
            this.data.push(obj);
            return validate;
        }
        return validate;
    }

    update(id, obj){
        const index = this.getIndexOf(id);

        if(index > -1){
            const validate = this.validate(obj);

            if (validate.status !== "ok") {
                return validate;
            }

            this.data[index] = Object.assign(this.data[index], obj);
            return validate;
        }
        return {
            status: "error",
            error: "object id not found"
        };
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
        return {
            status: "ok",
            error: null
        };
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;