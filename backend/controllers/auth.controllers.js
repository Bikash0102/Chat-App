
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generatetokenandsetcookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
   try {
       const { fullName, username, password, confirmPassword, gender } = req.body;

       if (password !==confirmPassword) {
           return res.status(400).json({ error: "passwords don't match" });
       }

       const users = await User.findOne({username});
       if (users) {
           return res.status(400).json({ error: "user already exists" });
       }

       const salt = await bcrypt.genSalt(10);
       const hashpassword = await bcrypt.hash(password, salt);
       const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
       const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;


       const newUser = new User({
           fullName,
           username,
           password:hashpassword,
           gender,
           profilepic: gender === "male" ?boyProfilePic : girlProfilePic,
       });

       await newUser.save();
       generatetokenandsetcookie(newUser._id, res);

       return res.status(201).json({
           _id: newUser._id,
           fullname: newUser.fullName,
           username: newUser.username,
           profilepic: newUser.profilepic
       });
   } catch (error) {
       console.error("Error in signup controller:", error.message);
       return res.status(500).json({ error: "Internal Server Error" });
   }
};


export const login= async(req,res)=>
{
    try{
   const{username,password}=req.body;
   const user=await User.findOne({username});
   const isPasswordCorrect=await bcrypt.compare(password,user?.password||"");
   if(!user|| !isPasswordCorrect)
   {
      return res.status(400).json({error:"Invaild username or password"});
   }
   
   generatetokenandsetcookie(user._id,res);
   res.status(200).json({
      _id:user._id,
      fullname:user.fullName,
      username:user.username,
      profilepic:user.profilepic
   })
   

    }
    catch(error)
    {
        console.log("Error in login  controller",error.message);
        res.status(500).json({error:"Internal server Error"})
    
    }
    

}
export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};