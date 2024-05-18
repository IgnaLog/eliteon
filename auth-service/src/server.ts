import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import createAccessLogStream from "./infrastructure/config/logStream";
import credentials from "./infrastructure/middlewares/credentials";
import corsOptionsDelegate from "./infrastructure/config/corsOptions";
import verifyJWT from "./infrastructure/middlewares/verifyJWT";
import cookieParser from "cookie-parser";
import usersRoutes from "./infrastructure/routes/users.routes";
import signupRoutes from "./infrastructure/routes/signup.routes";
import authRoutes from "./infrastructure/routes/auth.routes";
import refreshRoutes from "./infrastructure/routes/refresh.routes";
import logoutRoutes from "./infrastructure/routes/logout.routes";
import "./infrastructure/config/dbConn";

const app: Express = express();

/* Middlewares */
// Configuring Morgan to write to the log file
app.use(morgan("combined", { stream: createAccessLogStream() }));
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
// Cross Origin Resources Sharing
app.use(cors(corsOptionsDelegate));
// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
// Built-in middleware for json
app.use(express.json());
// Middleware for cookie
app.use(cookieParser());
// Serve static files
// app.use("/", express.static(path.join(__dirname, "/public")));

/* Routes */
app.use("/signup", signupRoutes);
app.use("/login", authRoutes);
app.use("/refresh", refreshRoutes);
app.use("/logout", logoutRoutes);
app.use(verifyJWT);
app.use("/users", usersRoutes);

/* Open the server */
const server = app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

export { app, server };
