import { NestFactory } from '@nestjs/core';
import { SchedulerRegistry } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cron = new AppService(new SchedulerRegistry());

  // if this program happens to have an error, on boot this will
  // be called database and automatically populate the cronjobs
  //await cron.callDataBaseToManuallyAdd()

  await app.listen(3000);
}
bootstrap();
