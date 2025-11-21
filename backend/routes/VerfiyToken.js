import jwt  from 'jsonwebtoken';
import {JWT_SECRET} from '../config/config.js'

const verifyToken = (req,res,next) =>{
  const authHeader = req.headers.token;
  if (authHeader){
    const token = authHeader.split(" ")[1];
    jwt.verify(token,JWT_SECRET,(err,user)=>{
      if (err) return res.status(403).json("Token is not valid");
      req.user = user;
      next();
      })
  }else{
    return res.status(401).json("You are not authanticated")
  }
}
const verifyTokenAndAuthorization = (req,res,next)=>{
  verifyToken(req,res,()=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
      next();
    }else{
      res.status(403).json("You are not Allowed to do that")
    }
  })
}

const verifyTokenAndAdmin = (req,res,next)=>{
  verifyToken(req,res,()=>{
    if(req.user.isAdmin){
      next();
    }else{
      res.status(403).json("You are not Allowed to do that")
    }
  })
}


export {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}; 