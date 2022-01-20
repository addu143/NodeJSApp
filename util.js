const moment = require("moment");

exports.validateDateFormat = (dateString) => {
    return moment(dateString, "YYYY-MM-DD", true).isValid();
}

exports.isEmptyApiRequest = (request) => {
    if(request == null)
        return true;

    return Object.keys(request).length === 0;
}

