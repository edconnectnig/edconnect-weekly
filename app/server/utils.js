function generate_random_id(){
    return  Math.random().toString(36).substring(2);
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    generate_random_id
}