import { Request, Response } from "express";
import { authService } from "../dependencies";
import { AppError } from "../../application/errors/appError";

const handleRefresh = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) throw new AppError(401, "Unauthorized"); // Unauthorized

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    const { success, accessToken, newRefreshToken } =
      await authService.handleRefreshToken(cookies.jwt);

    if (success) {
      // Send the refreshToken and save as a cookie in the browser
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      // Send access token to the frontEnd developer.
      res.json({ accessToken });
    }
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export default handleRefresh;
