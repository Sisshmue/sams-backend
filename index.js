import express from "express";
import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import assetRoute from "./src/routes/asset.route.js";
import assignmentRoute from "./src/routes/assignment.route.js";

const app = express();

app.use(express.json());
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/asset", assetRoute);
app.use("/assignment", assignmentRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
