import express, { NextFunction, Request, Response } from "express";

class UserValidation {
  static register = (req: Request, res: Response, next: NextFunction): void => {
    const newUser = req.body;
    if (Object.keys(newUser).length === 0) {
      res.status(400).json({ message: "User must be passed" });
    }

    if (!newUser.name || !newUser.email || !newUser.password) {
      res.status(400).json({ message: "User Fields are missing, provide all fields." });
    }

    next();
  };

  static login = (req: Request, res: Response, next: NextFunction): void => {
    const newUser = req.body;

    if ( !newUser.email || !newUser.password) {
      res.status(400).json({ message: "Empty Login fields" });
    }
    
    next();

  };
}

export {UserValidation};