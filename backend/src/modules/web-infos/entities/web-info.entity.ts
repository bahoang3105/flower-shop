import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WebInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mobilePhone: number;

  @Column()
  zaloLink: string;

  @Column()
  facebookLink: string;

  @Column()
  email: string;
}
