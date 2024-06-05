import { OrderStatus } from "@prisma/client";
import { CreateOrderDTO, GetOrderDTO } from "../dto";
import { OrdersRepository } from "../repository";
import { PickersService } from "@domains/pickers/service";
import axios from "axios";
import { BadRequestException } from "@utils";

const controlTowerURL = process.env.CONTROL_TOWER_URL + '/api/orders';

export class OrdersService {
  constructor(
    private readonly repository: OrdersRepository,
    private readonly pickersService: PickersService
  ) {}

  async getOrders(): Promise<GetOrderDTO[]> {
    return await this.repository.getOrders();
  }

  async createOrder(data: CreateOrderDTO): Promise<{id: string}> {
    const pickers = await this.pickersService.getPickers();
    const pickerId = pickers[Math.floor(Math.random() * pickers.length)].id;
    return await this.repository.createOrder(data, pickerId);
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    await this.repository.updateOrderStatus(orderId, status);
    await axios.patch(`${controlTowerURL}/${orderId}/PICKING/${status}`).catch((error) => {
      throw new BadRequestException(error.response.data.message)
    });
  }

}