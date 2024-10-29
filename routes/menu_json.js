"use strict";
const Connection = require('./../config/database');

const route_controller = [
    {
        method: "GET",
        path: "/getMenuJson",
        handler: async (request, h) => {
            try {
                const dbConnection = await Connection;
                const results = await dbConnection.query('SELECT * FROM test_schema.user_table');
                const rows = results.shift();
                console.log("Results: ", rows);
                return h.response(rows).code(200);
            } catch (error) {
                console.error("Database error:", error);
                return h.response({ error: "Database query failed" }).code(500);
            }
        },
    },

];

module.exports = route_controller;