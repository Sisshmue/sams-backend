import * as userRepo from "../repositories/user.repo.js";
import bcrypt from "bcrypt";
import { generateToken } from "../util/generateToken.js";
import prisma from "../data/prisma.js";

export const registerUser = async (data) => {
  const { name, email, password, roleId, departmentId } = data;
  const existingUser = await userRepo.findUserByEmail(email);

  if (existingUser) {
    throw new Error("User already registered");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  return await prisma.$transaction(async (tx) => {
    const createdUser = await userRepo.createUser(
      {
        name,
        email,
        password: hashPassword,
        roleId,
      },
      tx,
    );

    const createdEmployee = await userRepo.createEmployee(
      {
        userId: createdUser.id,
        departmentId,
      },
      tx,
    );

    const token = generateToken(createdUser);
    return {
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.roleId,
        departmentId: createdEmployee.departmentId,
        createdAt: createdUser.createdAt,
      },
      token,
    };
  });
};
