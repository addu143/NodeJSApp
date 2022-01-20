const { expect } = require('@jest/globals');
const util = require('./util');
const asd = require('./app');

test('should date format of JSON request valid', () => {
    const isValid = util.validateDateFormat("2020-12-12");
    expect(isValid).toBe(true);
});

test('passing null or empty object  in the request', () => {    
    
    let isEmpty = util.isEmptyApiRequest({});
    expect(isEmpty).toBe(true);
    isEmpty = util.isEmptyApiRequest(null);
    expect(isEmpty).toBe(true);
});





