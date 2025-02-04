import { generateToken } from '../config/jwtToken.js';
import { generateRefreshToken } from '../config/refreshToken.js';
import User from '../models/userModel.js'
import validateMongoDbId from '../utils/validateMongoDbId.js';

export const Signup = async (req, res) => {

  try {
    const email = req.body.email;

    const findUser = await User.findOne({email: email});

    if(findUser){
      return res.status(400).json({message: "Email already exists"});
    } else {
      const user = new User(req.body);
      await user.save();
      res.status(201).json({message: "User created successfully"});
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error"});
  }
}

export const Signin = async (req, res) => {
  try {

    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (findUser && (await findUser.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findUser?._id);
      const updateUser = await User.findByIdAndUpdate(
        findUser.id,
        { refreshToken },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.json({
        _id: findUser?._id,
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        mobile: findUser?.mobile,
        token: generateToken(findUser?._id),
      });
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const adminSignin = async (req,res) => {
  try {
    const { email, password} = req.body;
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== 'admin') return res.status(400).json({ message: "Not Authorized" });
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findAdmin?._id);
      const updateuser = await User.findByIdAndUpdate(
        findAdmin.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findAdmin?._id,
        firstname: findAdmin?.firstname,
        lastname: findAdmin?.lastname,
        email: findAdmin?.email,
        mobile: findAdmin?.mobile,
        token: generateToken(findAdmin?._id),
      });
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const Signout = async (req, res) => {
  try {
    
    const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) return res.status(400).json({ message: "No Refresh Token" });

  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.sendStatus(204);
  }

  await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });

  res.clearCookie("refreshToken", { httpOnly: true, secure: true });
  res.sendStatus(204).json({ message: "Signout Successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const UpdateUser = async (req, res) => {
  const { _id } = req.user; // Ensure this is coming from the URL parameter
  validateMongoDbId(_id); // Validate the MongoDB ID

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id, // Use the 'id' from req.params
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true, // This will return the updated document
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
