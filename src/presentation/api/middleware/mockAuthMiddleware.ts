// mockAuthMiddleware.js
import { Request, Response, NextFunction } from 'express';
const mockAuthMiddleware = (req:Request, res:Response, next:NextFunction) => {
    // Mock the user object on the request
    req.user = {
      id: 'mock-user-id',
      // Any other user properties you want to mock
    };
    next();
  };
  
  export default mockAuthMiddleware;
  