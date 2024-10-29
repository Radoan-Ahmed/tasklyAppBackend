'use strict';

const fs = require('fs');
const path = require('path');

const IMAGE_FILE_UPLOAD_TYPE = ['images', 'otherTypes'];

const route_controller = {
    method: "GET",
    path: '/downloadImage/{file_name}/{file_type}',
    handler: async (request, h) => {
        console.log(`Request received - ${JSON.stringify(request.params)}`);
        const response = await handle_request(request, h);
        console.log(`Response Sent - file download`);
        return response;
    }
};
const handle_request = async (request, h) => {
    if (!request.params.file_name) {
        console.log(`File name cannot be empty`);
        return h.response({ status: false, code: 201, message: 'File name cannot be empty' }).code(400);
    }
    if (!request.params.file_type || !IMAGE_FILE_UPLOAD_TYPE.includes(request.params.file_type)) {
        console.log(`File type is not defined/empty/not matched with ${IMAGE_FILE_UPLOAD_TYPE.join(', ')}`);
        return h.response({ status: false, code: 202, message: `File type is not defined/empty/not matched with ${IMAGE_FILE_UPLOAD_TYPE.join(', ')}` }).code(400);
    }
    const file_path = path.join('/opt/ims/data/files', request.params.file_type, request.params.file_name);
    try {
        if (!fs.existsSync(file_path)) {
            console.log(`${request.params.file_name} - file not found in storage`);
            return h.response({ status: false, code: 201, message: `${request.params.file_name} - file not found in storage` }).code(404);
        }
        const file = fs.createReadStream(file_path);
        console.log(`File download - ${request.params.file_type}/${request.params.file_name}`);

        let content_type = 'image/*';
        const ext = path.extname(request.params.file_name);
        if (ext.match(/\.(pdf)$/i)) {
            content_type = 'application/pdf';
        }
        return h
            .response(file)
            .type(content_type)
            .header('Content-Disposition', 'inline; filename=' + request.params.file_name);
    } catch (e) {
        console.log(`An exception occurred while downloading file: ${e?.message}`);
        return h.response({ status: false, code: 203, message: 'Unable to download file' }).code(500);
    }
};

module.exports = route_controller;
