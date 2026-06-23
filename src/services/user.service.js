import * as userRepo from "../repositories/user.repo.js";
import bcrypt from "bcrypt";
import { generateToken } from "../util/generateToken.js";
import prisma from "../data/prisma.js";
import route from "../routes/user.route.js";

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
        roleId: createdUser.roleId,
        departmentId: createdEmployee.departmentId,
        createdAt: createdUser.createdAt,
      },
      token,
    };
  });
};

export const loginUser = async (data) => {
  const { email, password } = data;
  const existingUser = await userRepo.findUserByEmail(email);
  if (!existingUser) {
    throw new Error("User's email does not exist!");
  }
  const matchedpassword = bcrypt.compareSync(password, existingUser.password);
  if (!matchedpassword) {
    throw new Error("Invalid Credentials");
  }
  const token = generateToken(existingUser);
  const existingEmployee = await userRepo.findEmployeByUserId(existingUser.id);
  return {
    user: {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      roleId: existingUser.roleId,
      departmentId: existingEmployee.departmentId,
      createdAt: existingUser.createdAt,
    },
    token,
  };
};

export const findUserById = async (userId) => {
  return await prisma.$transaction(async (tx) => {
    const user = await userRepo.findUserById(userId, tx);
    const employee = await userRepo.findEmployeByUserId(userId, tx);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        departmentId: employee.departmentId,
        createdAt: user.createdAt,
      },
    };
  });
};

export const findUserByEmail = async (email) => {
  const reult = await userRepo.findUserByEmail(email);
  return {
    user: {
      id: reult.id,
      name: reult.name,
      email: reult.email,
      roleId: reult.roleId,
      departmentId: reult.employee.departmentId,
      createdAt: reult.createdAt,
    },
  };
};

export const getUsers = async (data) => {
  const result = await userRepo.getUsers(data);
  return result;
};

export const updateUser = async (userId, data) => {
  const updatedUser = await userRepo.updateUser(userId, data);
  return updatedUser;
};

export const deactivateUser = async (userId) => {
  const result = await userRepo.deactivateUser(userId);
  return result;
};

export const getRoles = async () => {
  const result = await userRepo.getRoles();
  return result;
};
