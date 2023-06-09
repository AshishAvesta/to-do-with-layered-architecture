import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validate = [
  body('name').notEmpty().withMessage('Name should not be empty'),
  body('email').isEmail().withMessage('Email should be a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password should be at least 8 characters'),
  body('mobile').isMobilePhone('en-IN').withMessage('Mobile number should be a valid phone number'),
  (req : Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array().map(error => error.msg).join(', ');
      return res.status(400).json({ errors: errorMessage });
    }
    next();
  }
]
