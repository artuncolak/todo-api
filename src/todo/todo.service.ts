import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateTodoDto, UpdateTodoDto } from "./todo.dto";
import { Todo } from "./todo.entity";

@Injectable()
export class TodoService {
  async save(createTodoDto: CreateTodoDto): Promise<void> {
    await Todo.create({
      ...createTodoDto,
      dateCreated: new Date(),
    }).save();
  }

  async getAll(): Promise<Todo[]> {
    return await Todo.find({ order: { dateCreated: "DESC" } });
  }

  async getById(id: string): Promise<Todo> {
    const todo = await Todo.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} cannot be found`);
    }
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<void> {
    const todo = await this.getById(id);

    if (todo.body !== updateTodoDto.body) {
      await Todo.update(todo, { ...updateTodoDto, dateUpdated: new Date() });
    }
  }

  async delete(id: string): Promise<void> {
    const todo = await this.getById(id);
    await Todo.delete(todo);
  }
}
