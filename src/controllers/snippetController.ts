import { Request, Response } from 'express';
import { validateYaml } from '../utils/validateYaml';
import { saveYamlFile } from '../utils/fileUtils';
import { SnippetRequest, ApiResponse } from '../types/types';

export const saveSnippet = (req: Request, res: Response) => {
  const { snippet, vmId } = req.body as SnippetRequest;

  if (!validateYaml(snippet)) {
    const response: ApiResponse = {
      success: false,
      message: 'Invalid YAML content'
    };
    return res.status(400).json(response);
  }

  try {
    const { fileName, prefixedFileName } = saveYamlFile(snippet, vmId);
    const response: ApiResponse = {
      success: true,
      message: 'Snippet saved successfully',
      data: { 
        fileName,
        prefixedFileName
      }
    };
    return res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: 'Error saving snippet'
    };
    return res.status(500).json(response);
  }
}; 