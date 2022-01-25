import { IAddEventLesson } from "./IEventLesson";
import { IEventSession } from "./IEventSession";

export default interface IEventCtx {
  addSession: (name: string) => Promise<IEventSession>;
  addLesson: (sessionId: string, args: IAddEventLesson) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  deleteLesson: (sessionId: string, lessonId: string) => Promise<void>;
  updateSessionName: (sessionId: string, sessionName: string) => Promise<void>;
  updateLessonName: (
    sessionId: string,
    lessonId: string,
    lessonName: string
  ) => Promise<void>;
  sessions: IEventSession[] | [];
}
