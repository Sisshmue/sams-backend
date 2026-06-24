import { getRoles } from "../services/user.service.js";

const roleMiddleware =
  (...allowedRoles) =>
  async (req, res, next) => {
    try {
      const roles = await getRoles();
      const user = req.user;

      const userRole = roles.find((role) => role.id == user.roleId);
      if (!userRole || !allowedRoles.includes(userRole.position)) {
        return res.status(403).json({ message: "Access Denied" });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: "Authorization check failed" });
    }
  };

export default roleMiddleware;
