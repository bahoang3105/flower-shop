import { Role } from 'src/modules/auth/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserSex {
  Female = 'FEMALE',
  Male = 'MALE',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: UserSex, default: UserSex.Male })
  sex: UserSex;

  @Column()
  mobilePhone: string;
}
