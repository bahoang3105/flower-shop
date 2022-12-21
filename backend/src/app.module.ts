import 'dotenv/config';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './modules/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TopicsModule } from './modules/topics/topics.module';
import { FlowersModule } from './modules/flowers/flowers.module';
import { WebInfosModule } from './modules/web-infos/web-infos.module';
import { UsersModule } from './modules/users/users.module';
import { FlowerTopicModule } from './modules/flower-topic/flower-topic.module';
import { User } from './modules/users/entities/user.entity';
import { Topic } from './modules/topics/entities/topic.entity';
import { Flower } from './modules/flowers/entities/flower.entity';
import { FlowerTopic } from './modules/flower-topic/entities/flower-topic.entity';
import { WebInfo } from './modules/web-infos/entities/web-info.entity';
import { GuestPhonesModule } from './modules/guest-phones/guest-phones.module';
import { GuestPhone } from './modules/guest-phones/entities/guest-phone.entity';
import { Image } from './modules/images/entities/image.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Topic, Flower, FlowerTopic, WebInfo, GuestPhone, Image],
      synchronize: Boolean(process.env.SYNCHRONIZE_DB),
      charset: 'utf8mb4',
    }),
    AuthModule,
    TopicsModule,
    FlowersModule,
    FlowerTopicModule,
    WebInfosModule,
    UsersModule,
    GuestPhonesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'),
      serveRoot: '/images/',
    }),
    MulterModule.register({
      dest: './images',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
