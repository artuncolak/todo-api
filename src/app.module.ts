import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TodoModule } from "./todo/todo.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "todo-api",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    TodoModule,
  ],
  controllers: [],
})
export class AppModule {}
