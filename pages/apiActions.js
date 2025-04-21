import { request } from '@playwright/test';
import { saveToFile, getFilePath } from '../utils/fileHelper.js';
import fs from 'fs/promises';

export class ApiActions {
    constructor(baseURL, token) {
        this.baseURL = baseURL;
        this.token = token;
    }

    async initRequestContext() {
        this.context = await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: {
                Authorization: `Bearer ${this.token}`,
            },
        });
    }

    async downloadTextFile() {
        const response = await this.context.get('/doc/upload');
        const body = await response.text();
        await saveToFile(body);
        return body;
    }

    async uploadFile() {
        const filePath = getFilePath();
        const response = await this.context.post('/doc/upload', {
            multipart: {
                file: {
                    name: 'downloaded.txt',
                    mimeType: 'text/plain',
                    buffer: await fs.readFile(filePath),
                },
            },
        });
        return response;
    }

    async close() {
        await this.context.dispose();
    }
}
