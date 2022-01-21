const app = require('../app');
const request = require('supertest');
const { expect } = require('@jest/globals');
const mongoose = require("mongoose");
const jestDate = require("jest-date");

jest.useRealTimers();

test('return status code 400, if empty block or null', async () => {
    let res = await request(app).post('/api/caseStudy/filter').send({});
    expect(res.statusCode).toEqual(400);
    res = await request(app).post('/api/caseStudy/filter').send(null);
    expect(res.statusCode).toEqual(400);
})

test('totalCount should be between search criteria', async () => {
    jest.setTimeout(10 * 1000);

    const startDate = "2015-01-01";
    const endDate = "2015-01-03";

    const res = await request(app).post('/api/caseStudy/filter').send({
        startDate: startDate,
        endDate: endDate,
        minCount: 0,
        maxCount: 5000
    }).then((data)=> {
        data.body.records.forEach(element => {
            expect(element.totalCount).toBeGreaterThan(0);
            expect(element.totalCount).toBeLessThan(5000);    
        });        
    });
   
}, 50000);

test('createdAt should be between search criteria', async () => {
    jest.setTimeout(10 * 1000);

    const startDate = "2015-01-01";
    const endDate = "2015-01-03";

    const res = await request(app).post('/api/caseStudy/filter').send({
        startDate: startDate,
        endDate: endDate,
        minCount: 0,
        maxCount: 5000
    }).then((data)=> {
        data.body.records.forEach(element => {
            expect(new Date(element.createdAt)).toBeAfter(new Date(startDate));
            expect(new Date(element.createdAt)).toBeBefore(new Date(endDate));
        });        
    });
   
}, 50000)

afterAll(async () =>{
    mongoose.disconnect();
} );
