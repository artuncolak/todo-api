import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private getMethodWithColor(method: string) {
    switch (method) {
      case "POST":
      case "PUT":
        return method.blue;
      case "DELETE":
        return method.red;
      default:
        return method.green;
    }
  }

  private getCodeWithColor(statusCode: number) {
    switch (true) {
      case statusCode < 300:
        return `${statusCode}`.green;
      case statusCode < 400 && statusCode >= 300:
        return `${statusCode}`.blue;
      case statusCode >= 400:
        return `${statusCode}`.red;
    }
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;

    res.on("close", () => {
      const { statusCode } = res;
      const contentLength = res.get("content-length") || 0;

      Logger.log(
        `${this.getMethodWithColor(
          method,
        )} ${originalUrl} ${this.getCodeWithColor(
          statusCode,
        )} ${contentLength}`,
        "Log",
      );
    });

    next();
  }
}
