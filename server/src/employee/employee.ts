import { NextFunction, Request, Response, Router } from 'express';
import { getEmployeeRepository, Employee } from './models/employee.model';

export const router: Router = Router();

router.get('/api/employee', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getEmployeeRepository();
    const employees = await repository.find();
    res.send(employees);
  }
  catch (err) {
    console.log(err);
    return next(err);
  }
});