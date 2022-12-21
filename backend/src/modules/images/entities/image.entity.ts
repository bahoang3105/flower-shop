import { Flower } from 'src/modules/flowers/entities/flower.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Flower, (flower) => flower.listImage)
  flower: Flower;

  @Column()
  fileName: string;

  @Column()
  filePath: string;

  @Column()
  createdAt: Date;
}
