import { IEventLesson } from "./IEventLesson";

export interface IEventSession {
  id: string;
  name: string;
  lessons: [] | IEventLesson[];
}
