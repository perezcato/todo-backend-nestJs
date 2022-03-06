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
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import TodoService from './todo.service';
import { Response } from 'express';
import { Todo } from '../entity/todo.entity';
import RequestWithUser from '../auth/RequestWithUser';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('todo')
export default class TodoController {
  constructor(
    private todoService: TodoService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  @Get()
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

    console.log('this is the todos', todos, caching);
    return new Promise<Todo[]>((resolve) => resolve(todos));
  }

  @Post()
  async addTodo(
    @Body() reqBody: { name: string },
    @Req() req: RequestWithUser,
  ): Promise<Todo> {
    const todo = await this.todoService.addTodo(reqBody.name);
    await this.cache.del(`${req.user.id}`);
    // const todoEmit = await firstValueFrom(
    //   this.kafka.emit('todo', { id: todo.id }),
    // );
    // console.log('this is the todoemit', todoEmit);
    return new Promise<Todo>((resolve) => resolve(todo));
  }

  @Delete(':id')
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
