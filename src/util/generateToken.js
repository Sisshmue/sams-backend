import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user.id,
      roleId: user.roleId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );
  return token;
};
