import { Flower } from 'src/modules/flowers/entities/flower.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FlowerTopic {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Flower, (flower) => flower.flowerTopics)
  flower!: Flower;

  @ManyToOne(() => Topic, (topic) => topic.flowerTopics)
  topic!: Topic;

  @Column({ default: false })
  isDeleted: boolean;
}
