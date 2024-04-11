import { Request, Response } from "express";
import { authService } from "../dependencies";

const handleLogout = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      res.sendStatus(204); // No content
    } else {
      // If it finds the token it deletes it from the database otherwise it will do nothing
      await authService.handleLogout(cookies.jwt);

      // On client, also delete the accessToken
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      // Successful
      res.sendStatus(204); // No content
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handleLogout;
