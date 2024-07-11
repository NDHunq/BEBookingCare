import { where } from 'sequelize';
import db from '../models/index';
import bcrypt from 'bcryptjs';
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist=await checkUserEmail(email);
            let userData={};
            if(isExist){
                let user=await db.User.findOne({
                    where:{email:email},
                    attributes: ['email','roleId','password','firstName','lastName'],
                    raw: true
                });
                if(user)
                {
                    let check= await bcrypt.compareSync(password,user.password);
                    if(check)
                    {
                        userData.errCode=0;
                        userData.errMessage='OK';
                        delete user.password;
                        userData.user=user;
                    }
                    else
                    {
                        userData.errCode=3;
                        userData.errMessage='Your password is incorrect. Please try again!';
                    }
                }
                else
                {
                    userData.errCode=2;
                    userData.errMessage='Your email isn`t exist in system. Please try again!';
                }
            }
            else{
                userData.errCode=1;
                userData.errMessage='Your email isn`t exist in system. Please try again!';
            }
            resolve(userData);
        }  catch (error) {
            reject(error);
        }
    })
}


let checkUserEmail=(userEmail)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user=await db.User.findOne({where:{email:userEmail}});
            if(user)
                resolve(true);
            else
                resolve(false);
        }
        catch(e){
            reject(e);
        }
    })
}
let getAllUsers=(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let users='';
            if(userId==='ALL')
                users=await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            if(userId && userId!=='ALL')
                users=await db.User.findOne({
                    where:{id:userId},
                    attributes: {
                        exclude: ['password']
                    }
                });

                resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers:getAllUsers
}