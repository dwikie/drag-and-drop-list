import { IAddEventLesson } from "./IEventLesson";
import { IEventSession } from "./IEventSession";

export default interface IEventCtx {
  addSession: (name: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  addLesson: (sessionId: string, args: IAddEventLesson) => Promise<void>;
  deleteLesson: (sessionId: string, lessonId: string) => Promise<void>;
  sessions: IEventSession[] | [];
}
