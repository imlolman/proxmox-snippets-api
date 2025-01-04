import { Request, Response, NextFunction } from 'express';
import { config } from '../config/config';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== config.apiKey) {
    return res.status(401).json({
      success: false,
      message: 'Invalid API key'
    });
  }

  if (!req.body.snippet || typeof req.body.snippet !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Snippet is required and must be a string'
    });
  }

  if (!req.body.vmId || typeof req.body.vmId !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'VM ID is required and must be a string'
    });
  }

  next();
}; 