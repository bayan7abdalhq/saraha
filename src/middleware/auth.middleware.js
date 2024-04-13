
import jwt from 'jsonwebtoken';


const auth=async(req,res,next)=>{
    const {authorization} = req.headers;


if(!authorization.startsWith(process.env.BEARERKEY)){
  return res.json({message:"invalid authorization"});  
}
const token = authorization.split(process.env.BEARERKEY)[1];

const decoded = await jwt.verify(token,process.env.LOGINSIG);
const authUser= await userModel.findById(decoded.id).select('userName');
req.user=authUser;


next();

}
export default auth;