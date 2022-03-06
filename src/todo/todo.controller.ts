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

@Controller('todo')
export default class TodoController {
  constructor(
    private todoService: TodoService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  @Get()
  async getAll(@Req() req: RequestWithUser): Promise<Todo[]> {
    const cachedTodos = await this.cache.get(`${req.user.id}`);
    if (cachedTodos) {
      return this.cache.get(`${req.user.id}`);
    }
    const todos = await this.todoService.findAllUserTodos(req.user.id);
    await this.cache.set(`${req.user.id}`, todos, {
      ttl: parseInt((+new Date() / 1000).toString()) + 86400,
    });
    return new Promise<Todo[]>((resolve, rejects) => resolve(todos));
  }

  @Post()
  async addTodo(
    @Body() reqBody: { name: string },
    @Req() req: RequestWithUser,
  ): Promise<Todo> {
    const todo = await this.todoService.addTodo(reqBody.name);
    await this.cache.del(`${req.user.id}`);
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
