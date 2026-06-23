import { getRoles } from "../services/user.service.js";

const roleMiddleware = async (req, res, next) => {
  try {
    const roles = await getRoles();
    const adminRoleId = roles.find((role) => role.position == "Admin");
    const user = req.user;
    if (user.roleId != adminRoleId.id) {
      res.status(400).json({ message: "Access Denied" });
    }
    next();
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export default roleMiddleware;
