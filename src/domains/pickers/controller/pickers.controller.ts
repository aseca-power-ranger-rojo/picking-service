import { BodyValidation, db } from '@utils';
import { Request, Response, Router } from 'express'
import { CreatePickerDTO, GetPickerDTO } from '../dto';
import httpStatus from 'http-status';
import { PickersService } from '../service';
import { PickersRepository } from '../repository';

export const pickersController = Router();

const service: PickersService = new PickersService(new PickersRepository(db))

pickersController.get('/',  async(req: Request, res: Response) => {
    const pickers: GetPickerDTO[] = await service.getPickers();
    return res.status(httpStatus.OK).json(pickers);
  });
  
pickersController.post('/', BodyValidation(CreatePickerDTO), async(req: Request, res: Response) => {
  const data = req.body;
  await service.createPicker(data);
  return res.status(httpStatus.CREATED).json();
});
