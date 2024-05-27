import { PrismaClient } from "@prisma/client";
import { CreatePickerDTO, GetPickerDTO } from "../dto";

export class PickersRepository {
    constructor(private readonly db: PrismaClient) {}

    async getPickers(): Promise<GetPickerDTO[]> {
        const pickers = await this.db.picker.findMany({
            select: {
              id: true,
              name: true,
              surname: true
            }
        });
        return pickers.map(picker => new GetPickerDTO(picker));
    }

    async createPicker(data: CreatePickerDTO): Promise<void> {
        await this.db.picker.create({
            data: {
                ...data
            }
        });
    }

}