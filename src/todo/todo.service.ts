import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../entity/todo.entity';
import User from '../entity/user.entity';

@Injectable()
export default class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findAllUserTodos(userId: string): Promise<Todo[]> {
    return this.todoRepository.find({ where: { user: userId } });
  }

  async addTodo(name: string, user: User): Promise<Todo> {
    const todo = this.todoRepository.create({ name: name, user: user });
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
