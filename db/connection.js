import mongoose from 'mongoose';

const connectDb =()=>{
    mongoose.connect(process.env.DB)
    .then(()=>{
        console.log('connected');
    }).catch((error)=>{
        console.log(error);
    }); 
};
export default connectDb;