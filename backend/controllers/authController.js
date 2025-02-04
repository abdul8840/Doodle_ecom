import User from '../models/userModel.js'

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