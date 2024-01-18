import { PrismaClient, Prisma } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const getAllVentas = async (req: Request, res: Response): Promise<void> => {
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

// export const getVentasByUserId = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const ventas = await prisma.venta.findMany()

//         if (!ventas) {
//             res.status(404).json({
//                 message: 'No hay ventas'
//             })
//         }

//         res.status(200).json({
//             ventas,
//             message: 'Successful response'
//         })
//     } catch (error: any) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }

export const createVenta = async (req: Request, res: Response): Promise<void> => {
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



/*
{
    userId: 'user_523452345m2345hjkg234523',
    products: [
        {
            id_producto: 613,
            nombre_producto: 'Tornillo',
            cantidad: 2,
            precio_por_unidad: 300
        },
        {
            id_producto: 231,
            nombre_producto: 'Manzana',
            cantidad: 1,
            precio_por_unidad: 250
        },
    ]
}
*/