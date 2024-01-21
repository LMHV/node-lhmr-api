import { Webhook, WebhookRequiredHeaders } from 'svix';
import { Request, Response } from 'express';
import { UserJSON, WebhookEvent } from '@clerk/clerk-sdk-node';
import { IncomingHttpHeaders } from 'http';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

class WebhookController {

  async handleWebhook(req: Request, res: Response) {
    try {

      const payloadString = req.body!.toString(); // !
      const svixHeaders = req.headers;

      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY!);
      const evt = wh.verify(payloadString, svixHeaders as IncomingHttpHeaders & WebhookRequiredHeaders) as WebhookEvent;

      const { id, ...attributes } = evt.data;

      const eventType = evt.type;
      if (eventType === 'user.created') {
        const { username, email_addresses } = attributes as UserJSON;

        // console.log(`User ${id} was ${eventType}`);
        //console.log(`Id: ${id}, Username: ${username}, Email: ${email_addresses[0].email_address}`)

        try {
          await prisma.user.create({
            data: {
              externalId: id!,
              username: username!,
              email: email_addresses[0].email_address,
              subscriptionStatus: 'No Abonado',
              subscriptionPlan: 'Sin plan',
            }
          })
        } catch (error: any) {
          console.error(error.message)
        }
      }


      res.status(200).json({
        success: true,
        message: `Webhook received, event type ${evt.type}`,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

}

const webhookController = new WebhookController();
export default webhookController;