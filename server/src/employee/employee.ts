import { NextFunction, Request, Response, Router } from 'express';
import { getEmployeeRepository, Employee } from './models/employee.model';

export const router: Router = Router();

router.get('/api/employees', async function (req: Request, res: Response, next: NextFunction) {
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

router.post('/api/saveEmployee', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getEmployeeRepository();
    const employee = new Employee();
    employee.firstName = req.body.firstName;
    employee.lastName = req.body.lastName;
    employee.phoneNumber = req.body.phoneNumber;
    employee.email = req.body.email;
    employee.password = req.body.password;

    const result = await repository.save(employee);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.put('/api/updateEmployee/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getEmployeeRepository();
    const employee = await repository.findOne(req.params.id);
    employee.firstName = req.body.firstName;
    employee.lastName = req.body.lastName;
    employee.phoneNumber = req.body.phoneNumber;
    employee.email = req.body.email;
    employee.password = req.body.password;
    const result = await repository.save(employee);
    res.send(result);
  }
  catch (err) {
    console.log(err);
    return next(err);
  }
});

router.get('/api/employee/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getEmployeeRepository();
    const employee = await repository.findOne(req.params.id);
    res.send(employee);
  }
  catch (err) {
    console.log(err);
    return next(err);
  }
});

router.delete('/api/removeEmployee/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getEmployeeRepository();
    await repository.delete(req.params.id);
    res.send('Employee removed');
  }
  catch (err) {
    console.log(err);
    return next(err);
  }
});
