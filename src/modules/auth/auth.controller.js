import SendEmail from '../../utils/SendEmail.js';
import userModel from './../../../db/model/User.model.js';
import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken';



export const signup = async(req,res) =>{  
const{userName,email,password} = req.body;



const user = await userModel.findOne({email});

if(user){
    return res.status(409).json({message:"email already in use"});
}

const saltRound = parseInt(process.env.SALTROUND) ;
const hashedPassword = await bcrypt.hash(password, saltRound);
const newUser = await userModel.create({userName,email,password:hashedPassword});
if(!newUser){
    return res.json({message:"error while ctresting user"});
}
const token = await jwt.sign({email},process.env.CONFIRMEMAILTOKEN,{expiresIn:60*1});
const refreshToken = await jwt.sign({email},process.env.CONFIRMEMAILTOKEN,{expiresIn:60*60*24*30});
const html=`<div>
<h1>bayan abdalhq</h1>
<p> welcome ${userName}</p>
<div>
<a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}'>confirm email</a>
<a href='http://localhost:8000/auth/confirmEmail/${refreshToken}'> resend confirm email</a>
</div>
</div>`;
await SendEmail(email,"welcome mwssage",html);
return res.status(201).json({message:"success",newUser});

};

export const signin =async(req,res) => {
    const{email,password} = req.body;
    

    const user =await userModel.findOne({email}).select('userName password confirmEmail');
    if(!user){
        return res.status(409).json({message:"email not exists"});
    }
 
    if(!user.confirmEmail){
        return res.json({message:"plz confirm your email"});
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        return res.json({message:" invalid password"});
    }
    const token = jwt.sign({id:user._id},process.env.LOGINSIG)
    return res.json({message:"success",token});
};

export const confirmEmail =async(req,res) => {
    const {token} =req.params;
    const decoded= jwt.verify(token,process.env.CONFIRMEMAILTOKEN);
    const user =await userModel.updateOne({email:decoded.email},{confirmEmail:true});
    if(user.modifiedCount > 0){
     return res.redirect(process.env.FEURL);
    }
    
};