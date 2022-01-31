import { ILesson, ISession } from "./ICurricullum";

export default interface IEventCtx {
  addSession: (name: string) => Promise<ISession>;
  findSession: (id: string) => Promise<ISession>;
  addLesson: (sessionId: string, lesson: ILesson) => Promise<ILesson>;
  findLesson: (sessionId: string, lessonId: string) => Promise<ILesson>;
  deleteSession: (sessionId: string) => Promise<void>;
  deleteLesson: (sessionId: string, lessonId: string) => Promise<void>;
  updateSessionName: (sessionId: string, sessionName: string) => Promise<void>;
  updateLessonName: (
    sessionId: string,
    lessonId: string,
    lessonName: string
  ) => Promise<void>;
  sessions: ISession[] | [];
}
