"use strict";
const Connection = require('./../config/database');

const route_controller = [
    // {
    //     method: "GET",
    //     path: "/getImages",
    //     handler: async (request, h) => {
    //         console.log("the request payload is ", request.query);
    //         const { user_id } = request.query;
    //         try {
    //             const dbConnection = await Connection;
    //             const query = 'select image_table.image_string from test_schema.image_table where image_table.user_id = ?';
    //             const results = await dbConnection.query(query, [user_id]);
    //             const rows = results[0];
    //             console.log("Results: ", rows);
    //             return h.response(rows).code(200);
    //         } catch (error) {
    //             console.error("Database error:", error);
    //             return h.response({ error: "Database query failed" }).code(500);
    //         }
    //     },
    // },
    // {
    //     method: "POST",
    //     path: "/uploadImages",
    //     options: {
    //         payload: {
    //             output: "stream",          // Important for handling file streams
    //             parse: true,               // Parse payload
    //             allow: "multipart/form-data" // Allows form data
    //         }
    //     },
    //     handler: async (request, h) => {
    //         console.log("enter intu api");
    //         const response = await handle_request(request, h);
    //         return h.response(response);
    //     },
    // },

];

module.exports = route_controller;