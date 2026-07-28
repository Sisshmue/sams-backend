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
  const user = await userRepo.findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      departmentId: user.employee?.departmentId || null,
      isDeactivated: user.isDeactivated,
      createdAt: user.createdAt,
    },
  };
};

export const findUserByEmail = async (email) => {
  const user = await userRepo.findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      departmentId: user.employee?.departmentId || null,
      isDeactivated: user.isDeactivated,
      createdAt: user.createdAt,
    },
  };
};

export const getUsers = async (data) => {
  const { page, limit, ...filters } = data || {};
  const result = await userRepo.getUsers(page, limit, filters);
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

export const createRole = async (data) => {
  const result = await userRepo.createRole(data);
  return result;
};

export const updateRole = async (roleId, data) => {
  const result = await userRepo.updateRole(roleId, data);
  return result;
};

export const deleteRole = async (roleId) => {
  const result = await userRepo.deleteRole(roleId);
  return result;
};
