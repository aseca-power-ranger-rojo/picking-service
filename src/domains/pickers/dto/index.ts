import { IsNotEmpty, IsString } from "class-validator";

export class CreatePickerDTO {
    @IsString()
    @IsNotEmpty()
    name!: string

    @IsString()
    @IsNotEmpty()
    surname!: string
}

export class GetPickerDTO {
    constructor(picker: GetPickerDTO) {
        this.id = picker.id;
        this.name = picker.name;
        this.surname = picker.surname;
    }

    id: string
    name: string
    surname: string
}