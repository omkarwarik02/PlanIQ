const {auth} = require("../config/auth");

const protect = async(req,res,next)=>{
    try{
        const session = await auth.api.getSession({
            headers:req.headers,
        });
        if(!session || !session.user){
            return res.status(401).json({message:"Unauthorized"});
        }
        req.user = session.user;
        next();
    }catch(err){
        res.status(401).json({message:"Unauthorized"})
    }
};



module.exports = {protect};