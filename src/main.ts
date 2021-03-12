import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as colors from "colors";

import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./filters/http-exception.filter";

async function bootstrap() {
  console.clear();
  colors.enable();
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Todo API")
    .setDescription("Simple Todo API")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const PORT = process.env.PORT;
  const HOST = process.env.HOST;

  app.listen(PORT, () => {
    console.log();
    Logger.log(
      "App started on " + `http://${HOST}:${PORT}`.underline.blue,
      "Server",
    );
  });
}

bootstrap();
