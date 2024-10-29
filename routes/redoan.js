"use strict";
const Connection = require('./../config/database');
const dbConnection = Connection.connect;

const person = [
    {
        name: "John Doe",
        age: 30,
        occupation: "Software Developer"
    }
];


const route_controller = [
    {
        method: "GET",
        path: "/file",

        handler: async (request, h) => {
            
            return h.response(person);
        },
    },
    {
        method: "GET",
        path: "/new-route",

        handler: async (request, h) => {

            return h.response(person);
        },
    },
    {
        method: "POST",
        path: "/create",
        handler: async (request, h) => {
            const newTask = request.payload;
            const newParams = request.query.personName;
            person.push(newTask);
            console.log('New PARAMS:', dbConnection);
            const res = logicImplementation(newParams);
            console.log('New Task Created:', newTask);
            return h.response({ message: "Task created successfully", task: res }).code(201);
        }
    },

];

const logicImplementation = (params) => {
    let query = "select * from "
    return "received Params name is " + params
}
module.exports = route_controller;