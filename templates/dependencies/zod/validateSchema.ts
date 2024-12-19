  import { NextFunction, Request, Response } from "express"
  import { z } from "zod"

  const validateSchema = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const parsedError = error.issues[0].message
        res.status(400).json({ message: parsedError })
        return;
      }
      next(error)
    }
  }

  export default validateSchema;