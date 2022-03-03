import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TodoModule } from './todo/todo.module';
import { Todo } from './entity/todo.entity';
import AuthModule from './auth/auth.module';
import AuthMiddleware from './middlewares/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({ entities: [Todo] }),
    TodoModule,
    AuthModule,
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
