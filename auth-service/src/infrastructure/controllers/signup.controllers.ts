import { Request, Response } from "express";
import { AppError } from "../../application/errors/appError";
import { userService } from "../dependencies";

const handleNewUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    await userService.registerUser(email, password);
    res.status(201).json({ success: `New user ${email} created!` });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export default handleNewUser;
