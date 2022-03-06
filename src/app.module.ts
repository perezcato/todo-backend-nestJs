import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TodoModule } from './todo/todo.module';
import { Todo } from './entity/todo.entity';
import AuthModule from './auth/auth.module';
import AuthMiddleware from './middlewares/auth.middleware';
import { ClientsModule, Transport } from '@nestjs/microservices';
import UsersModule from './users/users.module';
import * as RedisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forRoot({ entities: [Todo] }),
    TodoModule,
    AuthModule,
    UsersModule,
    CacheModule.register({
      isGlobal: true,
      store: RedisStore,
      host: 'redis-10410.c15.us-east-1-4.ec2.cloud.redislabs.com',
      port: '10410',
      password: 'eBcKnhUDPcwUe2GEfukchA7AcrSxcUAB',
    }),
    // ClientsModule.register([
    //   {
    //     name: 'POC_KAFKA_INSTANCE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'poc_test_consumer',
    //         brokers: ['localhost:9092'],
    //       },
    //       consumer: {
    //         groupId: 'poc_test_consumer_group',
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('todo');
  }
}
