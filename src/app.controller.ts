import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { AppService, CronParams } from './app.service';

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
  addToDB(@Body() params: CronParams) {
    const { name, seconds } = params;
    return this.appService.addCronJobs(params);
  }

  @Post("/delete/:name")
  deleteDB(@Param("name") name: string) {
    return this.appService.deleteCron(name);
  }
}
