import { PrismaClient, Prisma } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();


export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.user.findMany();

        if (!users.length){
            res.status(200).json({
                message: 'Petición exitosa. No se encontraron usuarios.'
            })
            return;
        }
        res.json({
            message: 'Petición exitosa.',
            data: users,
        });
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};


