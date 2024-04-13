const dataMethods =['body','query','params'];

const validation = (schema) => {
    return (req, res, next) => {
        const validationArray = [];
        dataMethods.forEach(key=>{
            if(schema[key]){
                const validationResult =schema[key].validate(req[key], {abortEarly:false});
                if(validationResult.error){
                    validationArray.push(validationResult.error);
                }
            }
        });
        
        if (validationArray.length > 0) {
            return res.status(400).json({ message: "validation error", validationArray })
        }
        next();
    }
}
export default validation;