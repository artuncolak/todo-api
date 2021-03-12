import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CreateTodoDto, UpdateTodoDto } from "./todo.dto";
import { Todo } from "./todo.entity";
import { TodoService } from "./todo.service";

@Controller("todos")
@ApiTags("Todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async save(@Body() createTodoDto: CreateTodoDto): Promise<void> {
    await this.todoService.save(createTodoDto);
  }

  @Get()
  async getAll(): Promise<Todo[]> {
    return await this.todoService.getAll();
  }

  @Get(":id")
  async getById(@Param("id") id: string): Promise<Todo> {
    return await this.todoService.getById(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<void> {
    await this.todoService.update(id, updateTodoDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: string) {
    await this.todoService.delete(id);
  }
}
