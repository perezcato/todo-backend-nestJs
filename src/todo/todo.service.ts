import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';

@Injectable()
export default class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async addTodo(name: string): Promise<Todo> {
    const todo = this.todoRepository.create({ name: name });
    return this.todoRepository.save(todo);
  }

  async deleteTodo(id: string): Promise<boolean> {
    try {
      const todo = await this.todoRepository.findOne(id);
      await this.todoRepository.delete(todo);
      return true;
    } catch (e) {
      return false;
    }
  }
}
