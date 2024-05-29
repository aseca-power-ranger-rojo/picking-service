import { BadRequestException, BodyValidation, db } from '@utils';
import { Request, Response, Router } from 'express'
import { OrdersService } from '../service';
import { OrdersRepository } from '../repository';
import httpStatus from 'http-status';
import { GetOrderDTO, CreateOrderDTO } from '../dto';
import { OrderStatus } from '@prisma/client';
import { PickersService } from '@domains/pickers/service';
import { PickersRepository } from '@domains/pickers/repository';

export const ordersController = Router();

const service: OrdersService = new OrdersService(
  new OrdersRepository(db),
  new PickersService(new PickersRepository(db))
)

ordersController.get('/', async(req: Request, res: Response) => {
  const orders: GetOrderDTO[] = await service.getOrders();
  return res.status(httpStatus.OK).json(orders);
});
  
ordersController.post('/', BodyValidation(CreateOrderDTO),  async(req: Request, res: Response) => {
  const data = req.body;
  const order = await service.createOrder(data);
  return res.status(httpStatus.CREATED).json({ id: order.id });
});
  
ordersController.patch('/:orderId/:status', async(req: Request, res: Response) => {
  const status = (OrderStatus as any)[req.params.status.toUpperCase()]

  if (status === undefined) throw new BadRequestException('Invalid status');
  await service.updateOrderStatus(req.params.orderId, status as OrderStatus)
  
  return res.status(httpStatus.NO_CONTENT).json();
});