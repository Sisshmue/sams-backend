import express from "express";
import cors from 'cors';
import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import assetRoute from "./src/routes/asset.route.js";
import assignmentRoute from "./src/routes/assignment.route.js";
import maintenanceRoute from "./src/routes/maintenance.route.js";
import departmentRoute from "./src/routes/department.route.js";
import activityLogRoute from "./src/routes/activityLog.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/asset", assetRoute);
app.use("/assignment", assignmentRoute);
app.use("/maintenance", maintenanceRoute);
app.use("/department", departmentRoute);
app.use("/activity-log", activityLogRoute);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

server.on("error", (err) => {
  if (err.code === "EACCES") {
    console.error(`Permission denied binding to port ${port}. Port is excluded by Windows NAT/Hyper-V.`);
  } else if (err.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use.`);
  } else {
    console.error("Server startup error:", err);
  }
});

