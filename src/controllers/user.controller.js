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
    const { roleId, departmentId } = req.body;
    const result = await userServices.getUsers({ roleId, departmentId });
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
