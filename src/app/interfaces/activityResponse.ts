export interface ActivityResponse {
  data: {
    attempts: { weeks: string[]; values: number[] };
    content: string;
    skill: string;
    student: string;
    time: string;
    type: string;
  }[];
}
