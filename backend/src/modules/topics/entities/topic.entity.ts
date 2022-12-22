import { FlowerTopic } from 'src/modules/flower-topic/entities/flower-topic.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => FlowerTopic, (flowerTopic) => flowerTopic.topic)
  flowerTopics!: FlowerTopic[];

  @Column({ nullable: true })
  createdAt: Date;
}
