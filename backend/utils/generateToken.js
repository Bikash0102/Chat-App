// import  jwt  from "jsonwebtoken";

// const generatetokenandsetcookie=(userId,res)=>
// {
//     const token=jwt.sign({userId},process.env.JWT_PIN,{
//         expiresIn:'15d',
//     });
//     res.cookie("jwt",token,{
//         maxAge:15 * 24 * 60 * 60 * 1000,
//         httpOnly:true,
//         sameSite:"strict",
        
//     });
// }
// export default generatetokenandsetcookie;
import jwt from "jsonwebtoken";

const generatetokenandsetcookie = (userId, res) => {
    try {
        if (!userId) {
            throw new Error("userId is undefined");
        }

        if (!process.env.JWT_PIN) {
            throw new Error("JWT secret is undefined");
        }

        const token = jwt.sign({ userId }, process.env.JWT_PIN, {
            expiresIn: '15d',
        });

        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
        });
    } catch (error) {
        console.error("Error generating token and setting cookie:", error);
    }
};

export default generatetokenandsetcookie;
