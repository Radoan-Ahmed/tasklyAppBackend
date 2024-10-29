"use strict";
const Connection = require('./../config/database');
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');

const route_controller = [
    {
        method: "POST",
        path: "/uploadImage",
        options: {
            payload: {
                parse: true,
                output: "stream",
                parse: true,
                allow: "multipart/form-data",
                multipart: {
                    output: 'stream'
                },
                maxBytes: 1000 * 1000 * 5
            }
        },
        handler: async (request, h) => {
            console.log("enter into API");
            const response = await handle_request(request, h);
            return h.response(response);
        },
    }
];

const handle_request = async (request) => {
    const file = request.payload['file'];
    console.log("the file is :",file);
    if (!file || !file.hapi) {
        return { code: 400, status: false, message: 'No file uploaded' };
    }

    const ext = path.extname(file.hapi.filename);
    console.log("the ext is ",ext);
    const file_name = uuid.v4() + ext;

    console.log("the file name is ", file_name);

    if (!ext.match(/\.(jpe?g|png|pdf)$/i)) {
        return { code: 201, status: false, message: 'File extension must be jpg, jpeg, png, or pdf' };
    }

    const file_location = await store_file(request, file_name);
    if (!file_location) {
        return { code: 203, status: false, message: 'Unable to upload file' };
    }

    return { code: 200, status: true, message: 'File uploaded successfully', file_location };
};
const store_file = async (request, file_name) => {
    const file_data = request.payload['file'];
    const file_type = request.payload['file_type'] || 'uploads';
    const file_dir = path.join('/opt/ims/data/files', file_type);
    const file_location = path.join(file_dir, file_name);

    console.log("File directory:", file_dir);
    console.log("File location:", file_location);

    try {
        if (!fs.existsSync(file_dir)) {
            console.log(`Creating directory: ${file_dir}`);
            fs.mkdirSync(file_dir, { recursive: true });
        }

        const ws = fs.createWriteStream(file_location);
        file_data.pipe(ws);

        await new Promise((resolve, reject) => {
            ws.on('finish', resolve);
            ws.on('error', (err) => {
                console.error("Write stream error:", err.message);
                reject(err);
            });
        });

        return file_location;
    } catch (e) {
        console.error("An error occurred:", e.message);
        return null;
    }
};


module.exports = route_controller;
