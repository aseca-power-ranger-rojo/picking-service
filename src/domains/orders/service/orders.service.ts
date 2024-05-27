import { OrderStatus } from "@prisma/client";
import { CreateOrderDTO, GetOrderDTO } from "../dto";
import { OrdersRepository } from "../repository";

export class OrdersService {
  constructor(private readonly repository: OrdersRepository) {}

  async getOrders(): Promise<GetOrderDTO[]> {
    return await this.repository.getOrders();
  }

  async createOrder(data: CreateOrderDTO): Promise<void> {
    await this.repository.createOrder(data);
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    await this.repository.updateOrderStatus(orderId, status);
  }

}