export const asyncHandler = (fn)=>{

    return (req,res)=>{
        fn(req,res).catch(err=>{
            return res.json({message:"catch error",error:err.stack});
        });
    }

}