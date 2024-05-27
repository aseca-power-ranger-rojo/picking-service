import { OrderStatus, PrismaClient } from "@prisma/client";
import { CreateOrderDTO, GetOrderDTO } from "../dto";

export class OrdersRepository {
    constructor(private readonly db: PrismaClient) {}

    async getOrders(): Promise<GetOrderDTO[]> {
        const orders = await this.db.orderAssignment.findMany({
            where: {
                NOT: {
                status: OrderStatus.COMPLETED
                }
            },
            select: {
                id: true,
                orderId: true,
                status: true,
                picker: {
                select: {
                    id: true,
                    name: true,
                    surname: true
                }
                }
            }
        });
        return orders.map(order => new GetOrderDTO(order));
    }

    async createOrder(data: CreateOrderDTO): Promise<void> {
        await this.db.orderAssignment.create({
            data: {
                ...data
            }
        })
    }

    async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
        await this.db.orderAssignment.update({
            where: {
                id: orderId,
            },
            data: {
                status
            }
        });
    }

}