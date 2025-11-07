import express from 'express';
import mongoose from 'mongoose';
import {DB_URI,PORT} from './config/config.js';
const app = express();
//--
import userRouter from './routes/user.route.js';
import authRouter from "./routes/auth.route.js";

app.use(express.json());

mongoose.connect(DB_URI)
  .then(r => console.log(`MongoDB connected Successfully`))
  .catch((err) => console.log(err));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter );

app.get('/', (req, res) => {
  res.send('Hello World!').status(200).end();
})
app.get('/api/v1/test', (req, res) => {
  res.status(200).json({
    status: 'success',
    data:{
      product:"hello world"
    }
  }).end();
})
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})
