const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

//register
const registerController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    //validation
    if (existingUser) {
      res.status(200).send({
        success: false,
        message: "User already registered",
      });
    } else {
      //hash
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      req.body.password = hashedPassword;

      //rest data
      const user = new userModel(req.body);
      await user.save();
      return res.status(201).send({
        success: true,
        message: "User successfully registered",
        user,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in register API",
      error: error.message,
    });
  }
};
//login
const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //role check
    if(user.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "Role does not match",
      });
    }
    //validation with compare password
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Password is incorrect",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      success: true,
      message: `Welcome ${user.role}`,
      token,
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in login API",
      error: error.message,
    });
  }
};
//current user get
const currentUserController = async (req, res) => {
  try {
    const currentUser = await userModel.findOne({_id:req.body.userId});
    return res.status(200).send({
      success: true,
      currentUser
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in login API",
      error: error.message
    });
  }
};

module.exports = { registerController, loginController , currentUserController };
