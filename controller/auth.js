import { response } from 'express';
import UserDetails from '../model/schema.js'
import { successResponse } from '../interceptor/success.js';
import { errorResponse } from '../interceptor/error.js';
const addUser = async (req,res) => {
    let {name,number,password} = req.body;
    try{ 
        //checking if the user is already exists
        await UserDetails.find({number:number},(err,data)=>{
        var keycount  = Object.keys(data).length;
        //if user already exists
        if(keycount > 0){
            return errorResponse(res,404,"User already exists")
        }
        else{
        //adding a new user 
        const user = new UserDetails()
        user.username = name;
        user.number= number;
        user.password = password;
        user.save()
        return successResponse(res,201,"user added successfully")
        }
    })
    }
    catch(err){ 
        errorResponse(res,500,err);
    }
}

export {addUser} ;