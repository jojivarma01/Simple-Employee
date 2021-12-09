import {Entity, PrimaryGeneratedColumn, Column, createConnection, Connection, Repository} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('text')
  email: string;

  @Column()
  phoneNumber: number;

  @Column()
  password: string;
}

let connection:Connection;

export async function getEmployeeRepository(): Promise<Repository<Employee>> {
  if (connection===undefined) {
    connection = await createConnection({
      type: 'sqlite',
      database: 'employee',
      synchronize: true,
      entities: [
        Employee
      ],
    });
  }
  return connection.getRepository(Employee);
}