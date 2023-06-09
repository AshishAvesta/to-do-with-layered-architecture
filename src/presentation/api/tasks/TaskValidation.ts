import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateTask = [
  body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),
  body('dueDate').isISO8601().withMessage('Due date must be a valid ISO 8601 date'),
  body('priority').isIn(['low', 'medium', 'high']).withMessage('Priority must be one of: low, medium, high'),
  (req : Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array().map(error => error.msg).join(', ');
      return res.status(400).json({ errors: errorMessage });
    }
    next();
  }
];
