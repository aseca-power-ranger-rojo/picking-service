import { Router } from 'express'
import { pickersController } from '@domains/pickers'
import { ordersController } from '@domains/orders'

export const router = Router()

router.use('/pickers', pickersController);
router.use('/orders', ordersController);