import {
  Body,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import TodoService from './todo.service';
import { Response } from 'express';
import { Todo } from '../entity/todo.entity';
import RequestWithUser from '../auth/RequestWithUser';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { Roles } from '../decorators/role.decorator';
import AdminGuard from '../guards/admin.guard';

@Controller('todo')
export default class TodoController {
  constructor(
    private todoService: TodoService,
    @Inject(CACHE_MANAGER) private cache: Cache,
    @Inject('KAFKA_PRODUCER') private kafkaProducer: Producer,
  ) {}

  @Get()
  @UseGuards(AdminGuard)
  @Roles('read')
  async getAll(@Req() req: RequestWithUser): Promise<Todo[]> {
    const cachedTodos = (await this.cache.get(`${req.user.id}`)) as Todo[];
    console.log('cached todos', cachedTodos);
    if (cachedTodos && cachedTodos.length > 0) {
      return this.cache.get(`${req.user.id}`);
    }
    const todos = await this.todoService.findAllUserTodos(req.user.id);
    const caching = await this.cache.set(`${req.user.id}`, todos, {
      ttl: parseInt((+new Date() / 1000).toString()) + 86400,
    });

    return new Promise<Todo[]>((resolve) => resolve(todos));
  }

  @Post()
  @UseGuards(AdminGuard)
  @Roles('create')
  async addTodo(
    @Body() reqBody: { name: string },
    @Req() req: RequestWithUser,
  ): Promise<Todo> {
    const todo = await this.todoService.addTodo(reqBody.name, req.user);
    await this.cache.del(`${req.user.id}`);
    await this.kafkaProducer.send({
      topic: 'poc-server',

      messages: [{ value: todo.id.toString() }],
    });
    return new Promise<Todo>((resolve) => resolve(todo));
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @Roles('delete')
  deleteTodo(
    @Param() params: { id: string },
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (this.todoService.deleteTodo(params.id)) {
      this.cache.del(req.user.id);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return;
    }
  }
}
