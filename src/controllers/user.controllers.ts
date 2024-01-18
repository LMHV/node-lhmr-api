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


