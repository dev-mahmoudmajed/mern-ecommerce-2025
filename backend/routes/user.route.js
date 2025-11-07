import {Router} from "express"
const userRouter = Router();

userRouter.get('/',(req,res)=>{
  res.send('Hello in users route');
});


export default userRouter;