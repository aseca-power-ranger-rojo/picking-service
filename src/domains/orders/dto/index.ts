import { GetPickerDTO } from "@domains/pickers/dto";
import { OrderStatus } from "@prisma/client";
import { IsUUID, IsNotEmpty } from "class-validator";

export class CreateOrderDTO {
    @IsNotEmpty()
    @IsUUID()
    orderId!: string;

    @IsNotEmpty()
    @IsUUID()
    pickerId!: string;
}

export class GetOrderDTO {
    constructor(order: GetOrderDTO) {
        this.id = order.id;
        this.orderId = order.orderId;
        this.status = order.status;
        this.picker = new GetPickerDTO(order.picker);
    }

    id: string;
    orderId: string;
    status: OrderStatus;
    picker: GetPickerDTO;
}