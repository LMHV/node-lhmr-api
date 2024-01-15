import { PrismaClient, Prisma } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();


export const createVenta = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, products } = req.body;

        const venta = await prisma.venta.create({
            userId: userId,
            products: products
        });
        res.json({
            message: 'Successful response',
            data: venta,
        });
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

/*
{
    userId: 'user_523452345m2345hjkg234523',
    products: {
        {
            id_producto: 613,
            nombre_producto: 'Tornillo',
            cantidad: 2,
            precio_por_unidad: 300,
        },
        {
            id_producto: 231,
            nombre_producto: 'Manzana',
            cantidad: 1,
            precio_por_unidad: 250,
        },
    }
}
*/