import userModel from "../../../db/model/User.model.js";
import MessageModel from './../../../db/model/Message.model.js';

export const getMessages=async(req,res) =>{
    const messageList = await messageModel.find({receiverId:req.user._id});
    return res.json({message:"success",messageList})
}
export const sendMessage =async(req,res) =>{
const {receiverId} = req.params;
const { message } = req.body;
const user = await userModel.findById(receiverId);
if(!user){
    return res.status(404).json({ message:"user not found"});
}

const createMessage = await MessageModel.create({content:message,receiverId});
return res.status(201).json({ message:"success",createMessage});
};