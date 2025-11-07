/* eslint-disable no-undef */
import { config } from 'dotenv';

// es error to ts undefine its ok dont care
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const {PORT,NODE_ENV,DB_URI,PASS_SEC,JWT_SECRET,JWT_EXPIRES_IN} = process.env;