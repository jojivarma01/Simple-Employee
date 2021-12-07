import * as express from 'express';
import * as bodyParser from 'body-parser';
import {router as employeeRouter} from './src/employee/employee';

const app = express()
  .use(bodyParser.json())
  .use(employeeRouter);

app.listen(3080, () => {
  return console.log('My Node App listening on port 3080');
});
