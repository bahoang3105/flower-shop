import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GuestPhone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: string;

  @Column()
  pageAccess: string;

  @Column()
  timeAccess: Date;

  @Column({ default: false })
  isDeleted: boolean;
}
