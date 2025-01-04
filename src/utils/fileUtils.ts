import fs from 'fs';
import path from 'path';
import md5 from 'md5';
import { config } from '../config/config';

export const saveYamlFile = (content: string, vmId: string): { fileName: string; prefixedFileName: string } => {
  const fileName = `${vmId}-${md5(content)}.yaml`;
  const filePath = path.join(config.snippetsFolder, fileName);
  
  fs.writeFileSync(filePath, content, 'utf8');
  return {
    fileName,
    prefixedFileName: `${config.filenamePrefix}${fileName}`
  };
}; 