import { PrismaClient, Prisma } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const getAllSales = async (req: Request, res: Response): Promise<void> => {
    try {
        const sales = await prisma.sale.findMany()

        if (!sales.length) {
            res.status(200).json({
                message: 'Petición exitosa. No se encontraron ventas.'
            })
        }

        res.status(200).json({
            sales,
            message: 'Petición exitosa.'
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getSalesByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId
        console.log(userId)
        const sales = await prisma.sale.findMany({
            where: {
                userId
            }
        })
        console.log(sales)

        if (!sales.length) {
            res.status(200).json({
                message: 'Petición exitosa. No se encontraron ventas para el usuario.'
            })
        }

        res.status(200).json({
            sales,
            message: 'Petición exitosa.'
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getRecentSalesByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId
        console.log(userId)
        const sales = await prisma.sale.findMany({
            where: {
                userId
            },
            orderBy: { date: 'desc' },
            take: 10
        })
        console.log(sales)

        if (!sales.length) {
            res.status(200).json({
                message: 'Petición exitosa. Usuario sin ventas recientes.'
            })
        }

        res.status(200).json({
            sales,
            message: 'Petición exitosa.'
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const createSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, products } = req.body;

        const sales = await prisma.sale.create({
            data: {
                userId,
                products,
            }
        })

        res.status(200).json({
            message: 'Petición exitosa. Venta creada.',
            data: sales,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Error al intentar crear venta.',
            error: error.message
        });
    }
};
