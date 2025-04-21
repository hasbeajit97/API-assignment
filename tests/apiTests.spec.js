import { test, expect } from '@playwright/test';
import { ApiActions } from '../pages/apiActions.js';
import { readFileContent } from '../utils/fileHelper.js';

const API_TOKEN = 'your_api_key_here'; // Replace with real token

test.describe('API Testing with Auth, File Download & Upload', () => {
    let api;

    test.beforeAll(async () => {
        api = new ApiActions('https://www.convertapi.com', API_TOKEN);
        await api.initRequestContext();
    });

    test('2.1 - File download and write to local file', async () => {
        const body = await api.downloadTextFile();
        expect(body).toContain('Convert API'); // Or other relevant check
    });

    test('2.2 - Upload previously downloaded file', async () => {
        const content = await readFileContent();
        expect(content.length).toBeGreaterThan(0);

        const response = await api.uploadFile();
        expect(response.status()).toBe(200);
        const result = await response.json();
        console.log('Upload Response:', result);
    });

    test.afterAll(async () => {
        await api.close();
    });
});
