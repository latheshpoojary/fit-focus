import express from 'express';
import { ENV_KEY } from './enviroments';
import routes from './routes/index'
import errorHandler from './helpers/error.handler';
const server = express();

server.use(express.json())

server.use('/api',routes)

server.use(errorHandler)

server.listen(ENV_KEY.PORT,()=>{
    console.log("Server is running on ......",ENV_KEY.PORT);
    
})