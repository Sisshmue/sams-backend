import * as userServices from "../services/user.service.js";

export const userRegister = async (req, res) => {
  try {
    const result = await userServices.registerUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const result = await userServices.loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await userServices.findUserById(id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await userServices.findUserByEmail(email);
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { roleId, departmentId, page, limit } = req.body;
    const parsedPage = page !== undefined ? parseInt(page, 10) : undefined;
    const parsedLimit = limit !== undefined ? parseInt(limit, 10) : undefined;

    const result = await userServices.getUsers({
      roleId,
      departmentId,
      page: parsedPage,
      limit: parsedLimit,
    });
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updatedUser = async (req, res) => {
  try {
    const { userId, data } = req.body;
    const result = await userServices.updateUser(userId, data);
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deactivateUser = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await userServices.deactivateUser(id);
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getRoles = async (req, res) => {
  try {
    const result = await userServices.getRoles();
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const createRole = async (req, res) => {
  try {
    const data = req.body.data;
    await userServices.createRole(data);
    return res.status(200).json({
      message: "Role Creation successfully!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateRole = async (req, res) => {
  try {
    const roleId = req.body.id;
    const data = req.body.data;
    await userServices.updateRole(roleId, data);
    return res.status(200).json({
      message: "Successfully Updated!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const roleId = req.body.id;
    await userServices.deleteRole(roleId);
    return res.status(200).json({
      message: "Successfully deleted!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
