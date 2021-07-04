const toSentenceCase = (str) => str.charAt(0).toUpperCase() + str.substr(1);

/**
 * Translates a Mongoose ValidatorError or MongoDB DuplicateKeyError into a human readable string.
 *
 * Example usage :
 *
 *  import helper from 'mongo_helper';
 *  try {
 *   const doc = new Model({...})
 *   return await doc.save()
 *  } catch (error) {
 *    // converts the error object to an array of error messages.
 *    return helper.translateError(error)
 *  }
 * @param {*} err
 */
const translateError = (err) => {
  const errors = [];
  if (!err.code && !err.errors) {
    errors.push(err.message);
  } else if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    errors.push(toSentenceCase(`${field} already exists.`));
  } else {
    Object.keys(err.errors).map((field) => {
      let msg = err.errors[field].message;
      errors.push(toSentenceCase(msg.replace("Path ", "").replace(/`/g, "")));
    });
  }
  return errors;
};

module.exports = {
  translateError,
};