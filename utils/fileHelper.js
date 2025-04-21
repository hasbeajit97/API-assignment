import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('test-results/downloaded.txt');

export const saveToFile = async (data) => {
    await fs.writeFile(filePath, data, 'utf-8');
};

export const readFileContent = async () => {
    return await fs.readFile(filePath, 'utf-8');
};

export const getFilePath = () => filePath;
