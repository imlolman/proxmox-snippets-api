import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const createSnippetsFolder = () => {
  if (!process.env.SNIPPETS_FOLDER) {
    throw new Error('SNIPPETS_FOLDER environment variable must be defined');
  }
  const folderPath = path.join(process.env.SNIPPETS_FOLDER);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  return folderPath;
};

export const config = {
  apiKey: process.env.API_KEY || '',
  snippetsFolder: createSnippetsFolder(),
  filenamePrefix: process.env.FILENAME_PREFIX || 'local:snippets/'
}; 