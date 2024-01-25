import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRoutes from './routes/user.routes';
import saleRoutes from './routes/sale.routes';
import webhookRoutes from './routes/webhook.routes';
import productRoutes from './routes/product.routes';

// Config
const app: Express = express();
app.set('port', process.env.PORT)

app.use('/api/webhook', bodyParser.raw({ type: 'application/json' }), webhookRoutes)

// Midleware
app.use(express.json())
app.use(cors({
  //origin: "*",
  //methods: ["GET", "POST", "DELETE", "PUT"]
}))

// Routes
app.use('/api/users', userRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/products', productRoutes);

// Static Files

// Running..
app.listen(app.get('port'), () => console.log(`Server on: ${app.get('port')}`))


