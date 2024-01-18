import express, { Express } from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import ventasRoutes from './routes/venta.routes';
import webhookRoutes from './routes/webhook.routes';

import bodyParser from 'body-parser';

import { Webhook, WebhookRequiredHeaders } from 'svix';
import { IncomingHttpHeaders } from 'http';
import { WebhookEvent } from '@clerk/clerk-sdk-node';

// Config
const app: Express = express();
app.set('port', process.env.PORT)

// app.use('/api/webhook', bodyParser.raw({ type: 'application/json' }))
// app.use(webhookRoutes)

app.post(
  '/api/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async function (req, res) {
    try {
      const payloadString = req.body.toString();
      const svixHeaders = req.headers;

      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY!);
      const evt = wh.verify(payloadString, svixHeaders as IncomingHttpHeaders & WebhookRequiredHeaders) as WebhookEvent;
      const { id, ...attributes } = evt.data;
      // Handle the webhooks
      const eventType = evt.type;
      if (eventType === 'user.created') {
        console.log(`User ${id} was ${eventType}`);


        // const user = new User({
        //   clerkUserId: id,
        //   firstName: firstName,
        //   lastName: lastName,
        // });

        // await user.save();
        console.log('User saved to database');
      }
      res.status(200).json({
        success: true,
        message: 'Webhook received',
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
);

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


