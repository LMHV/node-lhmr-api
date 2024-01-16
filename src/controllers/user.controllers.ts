import { PrismaClient, Prisma } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();


export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.user.findMany();
        res.json({
            message: 'Successful response',
            data: users,
        });
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { externalId, username, email } = req.body;
        //console.log(`Body: ${req.body}`)
        // const productParsed = products as Prisma.JsonObject
        const user = await prisma.user.create({
            data: {
                externalId,
                username,
                email,
                subscriptionStatus: 'No Abonado',
                subscriptionPlan: 'Sin plan',
            }
        })
        res.status(200).json({
            message: 'Successful response',
            data: user,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Test',
            error: error.message
        });
    }
};
