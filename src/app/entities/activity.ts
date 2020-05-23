import { Attempt } from './Attempt';

export class Activity {
  public content: string;
  public skill: string;
  public student: string;
  public time: string;
  public type: string;
  public attempts: Attempt[];
}
