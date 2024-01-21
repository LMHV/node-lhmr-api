import { PrismaClient, Prisma } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const getProductsByUserId = async (req: Request, res: Response): Promise<void> => {

  try {

    const userId = req.params.userId

    const products = await prisma.product.findMany({
      where: {
        userId
      }
    })

    if (!products.length) {
      res.status(200).json({
        message: 'Petición exitosa. No se encontraron productos para dicho usuario.'
      })
    }

    res.status(200).json({
      products,
      message: 'Petición exitosa.'
    })

  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {

  try {
    const { userId, productName, price, measurementUnits, stock } = req.body

    const product = prisma.product.create({
      data: {
        userId,
        productName,
        price,
        measurementUnits,
        stock,
      }
    })

    res.status(200).json({
      message: 'Petición exitosa. Producto creado.',
      data: product,
    })
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const updateProductPrice = async (req: Request, res: Response): Promise<void> => {

  const { userId, productName, newPrice } = req.body

  const updatedProduct = await prisma.product.updateMany({ // Tenes que usar updateMany hasta lograr que prisma considere que userId y productName hace que sea unica la busqueda, sino no te deja hacer un update solo.
    where: {
      userId: userId,
      productName: productName,
    },
    data: {
      price: newPrice,
    },
  })
}