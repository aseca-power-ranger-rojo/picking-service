import { CreatePickerDTO, GetPickerDTO } from "../dto";
import { PickersRepository } from "../repository";


export class PickersService {
    constructor(private readonly repository: PickersRepository) {}

    async getPickers(): Promise<GetPickerDTO[]> {
        return await this.repository.getPickers();
    }

    async createPicker(data: CreatePickerDTO): Promise<void> {
        await this.repository.createPicker(data);
    }
}