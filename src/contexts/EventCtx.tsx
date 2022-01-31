import { v4 as uuidv4 } from "uuid";
import React from "react";
import IEventCtx from "../interfaces/IEventCtx";
import { ILesson, ISession } from "../interfaces/ICurricullum";

const defaultValue: IEventCtx = {
  addLesson: () => new Promise<ILesson>(() => {}),
  addSession: () => new Promise<ISession>(() => {}),
  deleteLesson: () => new Promise<void>(() => {}),
  deleteSession: () => new Promise<void>(() => {}),
  findLesson: () => new Promise<ILesson>(() => {}),
  findSession: () => new Promise<ISession>(() => {}),
  updateLessonName: () => new Promise<void>(() => {}),
  updateSessionName: () => new Promise<void>(() => {}),
  sessions: [],
};

const EventCtx = React.createContext<IEventCtx>(defaultValue);

export const useEventCtx = () => {
  const Ctx = React.useContext(EventCtx);
  if (!Ctx) {
    throw new Error("useEventCtx must be inside of EventCtx Provider.");
  }
  return Ctx;
};

const updateSavedSessions = (sessions: ISession[]): void => {
  if (typeof Storage === "undefined") {
    console.warn(
      "Browser does not support Storage: All data that has been added/modified is not saved"
    );
    return;
  }
  sessionStorage.setItem("SESSION_DATA", JSON.stringify(sessions));
};

const getSavedSessions = (): ISession[] | [] => {
  if (typeof Storage === "undefined") return [];
  const SESSION_DATA_STRING: string | null =
    sessionStorage.getItem("SESSION_DATA");
  if (SESSION_DATA_STRING !== null) {
    const SESSION_DATA: ISession[] = JSON.parse(SESSION_DATA_STRING);
    return SESSION_DATA;
  }
  return [];
};

export default function EventCtxProvider(
  props: React.PropsWithChildren<React.ReactNode>
) {
  const [sessions, setSessions] = React.useState<ISession[] | []>(
    getSavedSessions()
  );

  defaultValue.sessions = sessions;
  defaultValue.addSession = (name) => {
    return new Promise<ISession>((resolve, reject) => {
      try {
        const newSession: ISession = {
          id: uuidv4(),
          name: name,
          lessons: [],
        };
        setSessions((sessions) => [...sessions, newSession]);
        defaultValue.sessions = [...sessions, newSession];
        updateSavedSessions([...sessions, newSession]);
        resolve(newSession);
      } catch {
        reject();
      }
    });
  };
  defaultValue.addLesson = (sessionId, lesson) =>
    new Promise<ILesson>((resolve, reject) => {
      const sessionIndex = sessions.map((x) => x.id).indexOf(sessionId);
      if (sessionIndex === -1)
        reject("Failed to add lesson: Session not found");
      const newLesson = {
        ...lesson,
        id: uuidv4(),
      };
      sessions[sessionIndex].lessons = [
        ...sessions[sessionIndex].lessons,
        newLesson,
      ];
      setSessions(sessions);
      updateSavedSessions(sessions);
      resolve(newLesson);
    });
  defaultValue.deleteSession = (sessionId) =>
    new Promise<void>((resolve, reject) => {
      const sessionIndex = sessions.map((x) => x.id).indexOf(sessionId);
      if (sessionIndex === -1)
        reject("Failed to delete session: Session not found");
      sessions.splice(sessionIndex, 1);
      setSessions(sessions);
      updateSavedSessions(sessions);
      resolve();
    });
  defaultValue.deleteLesson = (sessionId, lessonId) =>
    new Promise<void>((resolve, reject) => {
      const sessionIndex = sessions.map((x) => x.id).indexOf(sessionId);
      if (sessionIndex === -1)
        reject("Failed to delete lesson: Session not found");
      const lessonIndex = sessions[sessionIndex].lessons
        .map((x) => x.id)
        .indexOf(lessonId);
      if (lessonIndex === -1)
        reject("Failed to delete lesson: Lesson not found");
      sessions[sessionIndex].lessons.splice(lessonIndex, 1);
      setSessions(sessions);
      updateSavedSessions(sessions);
      resolve();
    });
  defaultValue.updateSessionName = (sessionId, sessionName) =>
    new Promise<void>((resolve, reject) => {
      const sessionIndex = sessions.map((x) => x.id).indexOf(sessionId);
      if (sessionIndex === -1)
        reject("Failed to update session: Session not found");
      sessions[sessionIndex].name = sessionName;
      setSessions(sessions);
      updateSavedSessions(sessions);
      resolve();
    });
  defaultValue.updateLessonName = (sessionId, lessonId, lessonName) =>
    new Promise<void>((resolve, reject) => {
      const sessionIndex = sessions.map((x) => x.id).indexOf(sessionId);
      if (sessionIndex === -1)
        reject("Failed to update lesson: Session not found");
      const lessonIndex = sessions[sessionIndex].lessons
        .map((x) => x.id)
        .indexOf(lessonId);
      if (lessonIndex === -1)
        reject("Failed to update lesson: Lesson not found");
      sessions[sessionIndex].lessons[lessonIndex].name = lessonName;
      setSessions(sessions);
      updateSavedSessions(sessions);
      resolve();
    });

  return <EventCtx.Provider value={defaultValue} {...props} />;
}
