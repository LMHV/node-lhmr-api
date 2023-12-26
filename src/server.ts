import express, {Express} from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.ts';


// Config
const app: Express = express();
app.set('port', process.env.PORT)

// Midleware
app.use(express.json())
app.use(cors({
  //origin: "*",
  //methods: ["GET", "POST", "DELETE", "PUT"]
}))

// Routes
app.use('/api/users', userRoutes);

// Static Files


// Running..
app.listen(app.get('port'), () => console.log(`Server on: ${app.get('port')}`))


