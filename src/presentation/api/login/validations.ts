// validations.ts
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
export const loginValidationRules = () => {
  return [
    body('mobile').isMobilePhone('en-IN').withMessage('Mobile number should be a valid phone number'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 8 characters'),
  ]
}

export const validate = (req:Request, res:Response, next:NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors: { [key: string]: string }[] = []
  errors.array().map((err: any) => {
    if ('param' in err) {
        extractedErrors.push({ [err.param]: err.msg })
    } else if ('msg' in err) {
        extractedErrors.push({ msg: err.msg })
    }
})


const errorMessage = errors.array().map(error => error.msg).join(', ');
  return res.status(400).json({
    errors: errorMessage
  })
}
