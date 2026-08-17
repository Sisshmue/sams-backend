import * as departmentServices from "../services/department.service.js";

export const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Department name is required" });
    }
    const result = await departmentServices.createDepartment({ name });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllDepartments = async (req, res) => {
  try {
    const result = await departmentServices.getAllDepartments();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid department ID" });
    }
    const result = await departmentServices.getDepartmentById(id);
    if (!result) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid department ID" });
    }
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Department name is required" });
    }
    const result = await departmentServices.updateDepartment(id, { name });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid department ID" });
    }
    const result = await departmentServices.deleteDepartment(id);
    res.status(200).json({
      message: "Department deleted successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
