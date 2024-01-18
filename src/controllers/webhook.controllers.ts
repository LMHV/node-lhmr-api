import { Webhook, WebhookRequiredHeaders } from 'svix';
import { WebhookEvent } from '@clerk/clerk-sdk-node';
import { IncomingHttpHeaders } from 'http';

class WebhookController {

  async handleWebhook(req: Request, res: Response) {
    try {

      const payloadString = req.body!.toString(); // !
      const svixHeaders = req.headers;

      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY!);
      const evt = wh.verify(payloadString, svixHeaders as IncomingHttpHeaders & WebhookRequiredHeaders) as WebhookEvent;

      console.log(evt)
      console.log(evt.data)
      const { id, ...attributes } = evt.data;
      // Handle the webhooks
      const eventType = evt.type;
      if (eventType === 'user.created') {
        console.log(`User ${id} was ${eventType}`);
        console.log(attributes);
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

}

const webhookController = new WebhookController();
export default webhookController;