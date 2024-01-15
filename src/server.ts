import express, { Express } from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import ventasRoutes from './routes/venta.routes';


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
app.use('/api/ventas', ventasRoutes)

// Static Files


// Running..
app.listen(app.get('port'), () => console.log(`Server on: ${app.get('port')}`))


