import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import axios from 'axios';
import { CronJob, job } from 'cron';

export interface CronParams {
  seconds?: string;
  minutes: string;
  hours: string;
  dayMonths: string;
  month: string;
  dayWeek: string;
  name: string;
  endpoint: string;
}

@Injectable()
export class AppService implements OnModuleInit {

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  onModuleInit() {
      console.log("sdfdf")
      const callToDB: Array<CronParams>   = [
        {seconds: "*", "minutes": "*", hours: "*", dayMonths: "*", month: "*", dayWeek: "*", name: "test", 
        endpoint: "https://jsonplaceholder.typicode.com/todos/1" },
        {seconds: "*", "minutes": "*", hours: "*", dayMonths: "*", month: "*", dayWeek: "*", name: "henlo", endpoint: "https://jsonplaceholder.typicode.com/todos/1" },
      ]

      if(!this.schedulerRegistry.getCronJobs().size) {
         //call to database
         callToDB.forEach((data: CronParams) => {
          this.addCronJobs(data);
        });
      }
  

  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    return {
      data: "SFSDFSDF"
    }

  }

  startAndStopJobs(data: CronParams, isStart: boolean = true) {
    const {jobs, name} = this.addJobs(data);
    if(isStart) {
      jobs.start()
    }
    jobs.stop()

    isStart ? jobs.start() : jobs.stop()
  }

  addJobs(data: CronParams) {
    const { seconds, minutes, hours, dayMonths, month, dayWeek, name, endpoint } = data
    const jobs = new CronJob(`${seconds} * * * * *`, () => {
      console.log(`${name}_${new Date()}`);

      axios.get(endpoint).then(res => console.log(res.data))

    });

    return {jobs, name};
  }

  addCronJobs(data: CronParams) {

    const {jobs, name} = this.addJobs(data);
      this.schedulerRegistry.addCronJob(name, jobs);
      jobs.start();
    }

  checkCronJobs() {
    return this.schedulerRegistry.getCronJobs();
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();

    jobs.forEach((val, key, map) => {
      let next;

      try {
        next = val.nextDates().toJSDate();
      } catch(e) {
         console.log(e)
      }
    });
  }


}
