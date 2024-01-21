import { PrismaClient, Prisma } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const getAllSales = async (req: Request, res: Response): Promise<void> => {
    try {
        const ventas = await prisma.venta.findMany()

        if (!ventas) {
            res.status(404).json({
                message: 'No hay ventas'
            })
        }

        res.status(200).json({
            ventas,
            message: 'Successful response'
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
        const ventas = await prisma.venta.findMany({
            where: {
                userId
            }
        })
        console.log(ventas)

        if (!ventas) {
            res.status(200).json({
                message: 'No hay ventas para dicho usuario'
            })
        }

        res.status(200).json({
            ventas,
            message: 'Successful response'
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
        const ventas = await prisma.venta.findMany({
            where: {
                userId
            },
            orderBy: { date: 'desc' },
            take: 10
        })
        console.log(ventas)

        if (!ventas) {
            res.status(200).json({
                message: 'No hay ventas para dicho usuario'
            })
        }

        res.status(200).json({
            ventas,
            message: 'Successful response'
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
        // const productParsed = products as Prisma.JsonObject

        const venta = await prisma.venta.create({
            data: {
                userId,
                products,
            }
        })
        res.status(200).json({
            message: 'Successful response',
            data: venta,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Test',
            error: error.message
        });
    }
};
