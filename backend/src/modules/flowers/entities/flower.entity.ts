import { FlowerTopic } from 'src/modules/flower-topic/entities/flower-topic.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  size: string;

  @Column('simple-array')
  listImage: string[];

  @Column({ nullable: true })
  quantity: number;

  @Column()
  price: number;

  @Column({ default: false })
  isDeleted: boolean;

  @Column()
  createdAt: Date;

  @OneToMany(() => FlowerTopic, (flowerTopic) => flowerTopic.flower)
  flowerTopics!: FlowerTopic[];
}
