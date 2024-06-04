import express from "express";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import testRoute from "../api/routes/test.route.js";
import UserRoute from "../api/routes/user.route.js";
import postRoute from "./routes/post.route.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", UserRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);

app.listen(6969, () => {
  console.log(`Server is running on port 6969`);
});
