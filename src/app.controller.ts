import { Body, Controller, Get, Post, Request } from '@nestjs/common';
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

  @Post("/delete")
  deleteDB(@Body() name: Params) {
    this.appService.deleteCron(name.name);
  }
}
