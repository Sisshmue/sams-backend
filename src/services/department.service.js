import * as departmentRepo from "../repositories/department.repo.js";

export const createDepartment = async (data) => {
  const result = await departmentRepo.createDepartment(data);
  return result;
};

export const getAllDepartments = async () => {
  const result = await departmentRepo.getAllDepartments();
  return result;
};

export const getDepartmentById = async (id) => {
  const result = await departmentRepo.getDepartmentById(id);
  return result;
};

export const updateDepartment = async (id, data) => {
  const result = await departmentRepo.updateDepartment(id, data);
  return result;
};

export const deleteDepartment = async (id) => {
  const result = await departmentRepo.deleteDepartment(id);
  return result;
};
