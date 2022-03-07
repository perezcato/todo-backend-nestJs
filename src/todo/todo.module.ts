import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TodoController from './todo.controller';
import TodoService from './todo.service';
import { Todo } from '../entity/todo.entity';
import { ClientKafka } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [
    TodoService,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaClient: ClientKafka) => {
        return kafkaClient.connect();
      },
      inject: ['POC_KAFKA_INSTANCE'],
    },
  ],
})
export class TodoModule {}
