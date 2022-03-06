import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { Todo } from './entity/todo.entity';
import AuthModule from './auth/auth.module';
import AuthMiddleware from './middlewares/auth.middleware';
import UsersModule from './users/users.module';
import * as RedisStore from 'cache-manager-redis-store';
import KafkaModule from './common/modules/kafka.module';

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
    // KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('todo');
  }
}
