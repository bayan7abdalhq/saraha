import connectDb from '../../db/connection.js';
import messageRouter from './message/message.router.js';
import authRouter from './auth/auth.router.js';
import UserRouter from './user/user.router.js';
const initApp =(app,express) => {
    app.use(express.json());
    connectDb();
    app.use('/messages',messageRouter);
    app.use('/auth',authRouter);
    app.use('/user',UserRouter);
};
export default initApp;