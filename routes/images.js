"use strict";
const Connection = require('./../config/database');

const route_controller = [
    {
        method: "GET",
        path: "/getImage",
        handler: async (request, h) => {
            console.log("the request payload is ",request.query);
            const {user_id} = request.query;
            try {
                const dbConnection = await Connection;
                const query = 'select image_table.image_string from test_schema.image_table where image_table.user_id = ?';
                const results = await dbConnection.query(query,[user_id]);
                const rows = results[0];
                console.log("Results: ", rows);
                return h.response(rows).code(200);
            } catch (error) {
                console.error("Database error:", error);
                return h.response({ error: "Database query failed" }).code(500);
            }
        },
    },
    {
        method: "POST",
        path: "/setImage",
        handler: async (request, h) => {
            console.log("the request payload is ",request.payload);
            const {user_id,image_string} = request.payload;
            try {
                const dbConnection = await Connection;
                const query = 'insert into test_schema.image_table(user_id, image_string) values(?,?)';
                const results = await dbConnection.query(query,[user_id,image_string]);
                const rows = results.shift();
                console.log("Results: ", rows);
                return h.response({message:"image saved successfully"}).code(200);
            } catch (error) {
                console.error("Database error:", error);
                console.error("Database error:", error.sqlMessage);
                return h.response({ error: error.sqlMessage }).code(500);
            }
        },
    },
    {
        method: "PUT",
        path: "/updateImage",
        handler: async (request, h) => {
            console.log("the request payload is ",request.payload);
            const {user_id,image_string} = request.payload;
            try {
                const dbConnection = await Connection;
                const query = 'update test_schema.image_table set image_string = ? where image_table.user_id = ?';
                const results = await dbConnection.query(query,[image_string,user_id]);
                const rows = results.shift();
                console.log("Results: ", rows);
                return h.response({message:"image update successfully"}).code(200);
            } catch (error) {
                console.error("Database error:", error);
                console.error("Database error:", error.sqlMessage);
                return h.response({ error: error.sqlMessage }).code(500);
            }
        },
    }

];

module.exports = route_controller;