// src/middlewares/validateToDo.ts

import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateToDo = [
  check('title').isString().notEmpty().withMessage('Title must be a non-empty string'),
  check('description').isString().notEmpty().withMessage('Description must be a non-empty string'),
  check('completed').isBoolean().withMessage('Completed must be a boolean'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array().map(error => error.msg).join(', ');
      return res.status(400).json({ error: errorMessage });
    }
    next();
  },
];
