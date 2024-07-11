import userService from '../services/userService'
let handleLogin=async(req,res)=>{
    let mail=req.body.email;
    let pass=req.body.password;

    if(!mail||!pass)
    {
        return res.status(500).json({
            errCode:1,
            message:'Missing input parameter'
        });
    }

    let userData=await user.handleUserLogin(mail,pass);
    return res.status(200).json({
        errCode:userData.errCode,
        message:userData.errMessage,
        user:userData.user?userData.user:{}
    });
}
let handleGetAllUsers=async(req,res)=>{
    let id=req.query.id;
    if(!id)
    {
        return res.status(200).json({
            errCode:1,
            message:'Missing input parameter'
        });
    }
    let users=await userService.getAllUsers(id);
    return res.status(200).json({
        errCode:0,
        message:'0',
        users
    });
}

module.exports={
    handleLogin:handleLogin,
    handleGetAllUsers:handleGetAllUsers
}