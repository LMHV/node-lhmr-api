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
            return;
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
        const sales = await prisma.sale.findMany({
            where: {
                userId
            },
            orderBy: { date: 'desc' },
        })

        if (!sales.length) {
            res.status(200).json({
                message: 'Petición exitosa. No se encontraron ventas para el usuario.'
            });
            return;
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
        const sales = await prisma.sale.findMany({
            where: {
                userId
            },
            orderBy: { date: 'desc' },
            take: 100
        })

        if (!sales.length) {
            res.status(200).json({
                message: 'Petición exitosa. Usuario sin ventas recientes.'
            })
            return;
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


export const deleteSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, saleId } = req.params;
        const sale = await prisma.sale.findFirst({
            where: {
                id: parseInt(saleId)
            }
        })
        if (!sale) {
            res.status(404).json({
                message: 'No se encontró venta'
            })
            return;
        }

        const deletedSale = await prisma.sale.delete({
            where: {
                userId,
                id: parseInt(saleId),
            }
        })
        res.status(200).json({
            message: 'Petición exitosa. Venta eliminada.',
            data: deletedSale,
        });
    } catch (error: any) {
        console.log('test')
        res.status(500).json({
            message: 'Error al intentar eliminar venta.',
            error: error.message
        });
    }
};