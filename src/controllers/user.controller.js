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
