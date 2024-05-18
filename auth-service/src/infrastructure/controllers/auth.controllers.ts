import { Request, Response } from "express";
import { authService } from "../dependencies";
import { AppError } from "../../application/errors/appError";

const handleLogin = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    const { email, password } = req.body;

    const { clearCookie, foundUser, accessToken, newRefreshToken } =
      await authService.handleLogin(email, password, cookies);

    if (clearCookie) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
    }

    // Send the refreshToken to save it as a cookie in the browser
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true, // With 'httpOnly' it will only be accessible from an http request, not from a javascript, which makes it more secure
      sameSite: "none", // None: The cookie will be sent with requests made from any site, including requests from third parties.
      secure: true, // The cookie will only be sent over a secure connection (https) (Only use in production)
      maxAge: 24 * 60 * 60 * 1000, // 1d in milliseconds
    });

    // // Send the accessToken
    res.json({ accessToken, user: foundUser.id });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export default handleLogin;
