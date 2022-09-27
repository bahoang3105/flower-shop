import 'dotenv/config';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './modules/auth/auth.module';
import { DataSource } from 'typeorm';
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
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.PORT),
      },
      ttl: Number(process.env.REDIS_TTL),
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Topic, Flower, FlowerTopic, WebInfo, GuestPhone],
      synchronize: Boolean(process.env.SYNCHRONIZE_DB),
    }),
    AuthModule,
    TopicsModule,
    FlowersModule,
    FlowerTopicModule,
    WebInfosModule,
    UsersModule,
    GuestPhonesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
