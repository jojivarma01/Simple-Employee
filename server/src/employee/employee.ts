import { NextFunction, Request, Response, Router } from 'express';
import { getEmployeeRepository, Employee, LoginAuth } from './models/employee.model';

export const router: Router = Router();

const jwt = require('jsonwebtoken');

router.get('/api/employees', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization']
    const user_token = authHeader && authHeader.split('Bearer ')[1];
    const isTokenVerified = jwt.verify(user_token, 'secret');
    if (isTokenVerified) {
      const repository = await getEmployeeRepository();
      const employees = await repository.find();
      res.status(200).send(employees);
    } else {
      res.status(403).send('Not Authorized');
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
    return next(err);
  }
});

router.post('/api/saveEmployee', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization']
    const user_token = authHeader && authHeader.split('Bearer ')[1];
    const isTokenVerified = jwt.verify(user_token, 'secret');
    if (isTokenVerified) {
      const repository = await getEmployeeRepository();
      const employee = new Employee();
      employee.firstName = req.body.firstName;
      employee.lastName = req.body.lastName;
      employee.phoneNumber = req.body.phoneNumber;
      employee.email = req.body.email;
      employee.password = req.body.password;

      const result = await repository.save(employee);
      res.status(200).send(result);
    } else {
        res.status(403).send('Not Authorized');
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
    return next(err);
  }
});

router.put('/api/updateEmployee/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization']
    const user_token = authHeader && authHeader.split('Bearer ')[1];
    const isTokenVerified = jwt.verify(user_token, 'secret');
    if (isTokenVerified) {
      const repository = await getEmployeeRepository();
      const employee = await repository.findOne(req.params.id);
      employee.firstName = req.body.firstName;
      employee.lastName = req.body.lastName;
      employee.phoneNumber = req.body.phoneNumber;
      employee.email = req.body.email;
      employee.password = req.body.password;
      const result = await repository.save(employee);
      res.status(200).send(result);
    } else {
      res.status(403).send('Not Authorized');
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
    return next(err);
  }
});

router.get('/api/employee/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    const user_token = authHeader && authHeader.split('Bearer ')[1];
    const isTokenVerified = jwt.verify(user_token, 'secret');
    if (isTokenVerified) {
      const repository = await getEmployeeRepository();
      const employee = await repository.findOne(req.params.id);
      res.status(200).send(employee);
    } else {
      res.status(403).send('Not Authorized');
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
    return next(err);
  }
});

router.delete('/api/removeEmployee/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization']
    const user_token = authHeader && authHeader.split('Bearer ')[1];
    const isTokenVerified = jwt.verify(user_token, 'secret');
    if (isTokenVerified) {
      const repository = await getEmployeeRepository();
      await repository.delete(req.params.id);
      res.status(200).send('Employee removed');
    } else {
      res.status(403).send('Not Authorized');
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
    return next(err);
  }
});

router.post('/api/auth', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getEmployeeRepository();
    const employees = await repository.find();
    const filteredEmployeeData = employees.filter(x => x.email === req.body.email);
    let loginAuth = {} as LoginAuth;
    if(filteredEmployeeData.length > 0) 
    {
      if (filteredEmployeeData[0].password === req.body.password) {
        const createdtoken = jwt.sign({email: req.body.email}, 'secret');
        loginAuth.empId = filteredEmployeeData[0].id;
        loginAuth.isLoginSuccess = true;
        loginAuth.userToken = createdtoken;
      }
    }
    if (Object.keys(loginAuth).length > 0 && loginAuth.isLoginSuccess) {
      res.status(200).json(loginAuth);
    } else {
      res.status(403).send('login failed');
    }
  }
  catch (err) {
    res.status(500).json(err);
    return next(err);
  }
});
