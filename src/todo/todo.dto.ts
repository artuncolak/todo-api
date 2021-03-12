import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  body: string;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
