import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';

export class Params {
  name: string;
  seconds: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): void {
    this.appService.getCrons()
  }

  @Post()
  addToDB(@Body() params: Params) {
    const { name, seconds } = params;
    this.appService.addCronJobs(name, seconds);
  }

  @Post("/delete/:name")
  deleteDB(@Param("name") name: string) {
    this.appService.deleteCron(name);
  }
}
