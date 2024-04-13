import express from 'express';
import initApp from './src/modules/app.router.js';
const app = express();
import 'dotenv/config'
const PORT = process.env.PORT;


initApp(app,express);
app.listen(PORT,()=>{
console.log(`listening on ${PORT}`);
});