import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import axios from 'axios';
import { CronJob } from 'cron';

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
export class AppService {

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    console.log("deleted", name)
  }

  addCronJobs(name: string, seconds: string ) {
     // const { seconds, minutes, hours, dayMonths, month, dayWeek, name, endpoint } = data
      const jobs = new CronJob(`${seconds} * * * * *`, () => {
        console.log(`${name}_${new Date()}`);

        axios.get("https://jsonplaceholder.typicode.com/todos/1").then(res => console.log(res.data))
  
      });
      this.schedulerRegistry.addCronJob(name, jobs);
      jobs.start();
    }

  checkLength() {
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

  checkIfHasNoCronJobStored() {
    return this.schedulerRegistry.getCronJobs()
  }

  async callDataBaseToManuallyAdd() {
    const callToDB: Array<CronParams>   = [
      {seconds: "1", "minutes": "*", hours: "*", dayMonths: "*", month: "*", dayWeek: "*", name: "test", 
      endpoint: "https://jsonplaceholder.typicode.com/todos/1" },
      {seconds: "45", "minutes": "*", hours: "*", dayMonths: "*", month: "*", dayWeek: "*", name: "henlo", endpoint: "https://jsonplaceholder.typicode.com/todos/" },
    ]

    if(!this.checkIfHasNoCronJobStored().size) {
        callToDB.forEach(({ seconds, name}) => {
          this.addCronJobs(name, seconds);
        });
    }




  }



}
