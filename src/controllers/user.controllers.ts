import { PrismaClient, Prisma } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();
import { Webhook } from 'svix';


export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.user.findFirst();
        res.json({
            message: 'Successful response',
            data: users,
        });
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req: Request, res: Response): Promise<any> => {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
    if (!WEBHOOK_SECRET) {
        throw new Error('You need a WEBHOOK_SECRET in your .env')
    }
    // Grab the headers and body
    const headers = req.headers;
    const payload = req.body
    // Get the Svix headers for verification
    const svix_id = headers["svix-id"] as string;
    const svix_timestamp = headers["svix-timestamp"] as string;
    const svix_signature = headers["svix-signature"] as string;

    // If there are missing Svix headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }
    // Initiate Svix
    const wh = new Webhook(WEBHOOK_SECRET)
    let evt: Event
    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If the verification fails, error out and  return error code
    try {
        evt = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as Event
    } catch (err: any) {
        // Console log and return errro
        console.log('Webhook failed to verify. Error:', err.message)
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }

    // Grab the ID and TYPE of the Webhook
    const { id } = evt.data;
    const eventType = evt.type;

    console.log(`Webhook with an ID of ${id} and type of ${eventType}`)
    // Console log the full payload to view
    console.log('Webhook body:', evt.data)

    return res.status(200).json({
        success: true,
        message: 'Webhook received'
    })

    
}

type EventType = "user.created" | "user.updated" | "*";

type Event = {
    data: Record<string, string | number>;
    object: "event";
    type: EventType;
};


/*
    FUNCION ANTERIOR 

    try {
        const { username, email }: { username: string; email: string } = req.body;

        const user: Prisma.userCreateInput = {
            username,
            email,
        }

        const existUser = await prisma.user.findUnique({
            where: {
                username,
                email
            }
        })

        if (existUser) {
            return res.status(200).json({ message: 'Usuario existente.' })
        }

        await prisma.user.create({
            data: user
        })
        return res.status(200).json({ message: 'Exitoso' })

    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
    }


/*
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}



export const modifyUser = async (req, res) => {
    try {
        const { name, email, password, age } = req.body
        const newUser = { name, email, password, age };
        await User.findByIdAndUpdate(req.params.id, newUser);
        res.json({ status: 'Usuario modificado' });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ status: 'Usuario eliminado' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}

export const findUser = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Check if exists
        const existUser = await User.findOne({ email: req.body.email, password: req.body.password })
        if (!existUser) {
            return res.json({status: 'Usuario incorrecto. Intente otra vez...'})
        }
        return res.json({ status: 'Exitoso'})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}
*/