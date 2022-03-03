import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import TodoService from './todo.service';
import { Response } from 'express';
import { Todo } from '../entity/todo.entity';

@Controller('todo')
export default class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post()
  addTodo(@Body() reqBody: { name: string }): Promise<Todo> {
    return this.todoService.addTodo(reqBody.name);
  }

  @Delete(':id')
  deleteTodo(
    @Param() params: { id: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    if (this.todoService.deleteTodo(params.id)) {
      res.status(HttpStatus.NO_CONTENT);
      return;
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return;
    }
  }
}
