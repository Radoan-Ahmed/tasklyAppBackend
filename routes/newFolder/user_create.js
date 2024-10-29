"use strict";
const Connection = require('./../../config/database');

const route_controller = [
    {
        method: "POST",
        path: "/usersCreate",
        handler: async (request, h) => {
            const {username, password} = request.payload;
            try {
                const dbConnection = await Connection;
                const sql = 'INSERT INTO user_table (user_name, password) VALUES (?, ?)';
                const result = await dbConnection.query(sql, [username, password]);
                return h.response({message:"success"}).code(200);
            } catch (error) {
                console.error("Database error:", error);
                return h.response({ error: "Database query failed" }).code(500);
            }
        },
    },

];

module.exports = route_controller;