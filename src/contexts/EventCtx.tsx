import { v4 as uuidv4 } from "uuid";
import React from "react";
import IEventCtx from "../interfaces/IEventCtx";
import { IEventSession } from "../interfaces/IEventSession";

const defaultValue: IEventCtx = {
  addLesson: () => new Promise<void>(() => {}),
  addSession: () => new Promise<IEventSession>(() => {}),
  deleteLesson: () => new Promise<void>(() => {}),
  deleteSession: () => new Promise<void>(() => {}),
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

const updateSavedSessions = (sessions: IEventSession[]): void => {
  if (typeof Storage === "undefined") {
    console.warn(
      "Browser does not support Storage: All data that has been added/modified is not saved"
    );
    return;
  }
  sessionStorage.setItem("SESSION_DATA", JSON.stringify(sessions));
};

const getSavedSessions = (): IEventSession[] | [] => {
  if (typeof Storage === "undefined") return [];
  const SESSION_DATA_STRING: string | null =
    sessionStorage.getItem("SESSION_DATA");
  if (SESSION_DATA_STRING !== null) {
    const SESSION_DATA: IEventSession[] = JSON.parse(SESSION_DATA_STRING);
    return SESSION_DATA;
  }
  return [];
};

export default function EventCtxProvider(
  props: React.PropsWithChildren<React.ReactNode>
) {
  const [sessions, setSessions] = React.useState<IEventSession[] | []>(
    getSavedSessions()
  );

  defaultValue.sessions = sessions;
  defaultValue.addSession = (name) => {
    return new Promise<IEventSession>((resolve, reject) => {
      try {
        const newSession: IEventSession = {
          id: uuidv4(),
          name: name,
          lessons: [],
        };
        setSessions((sessions) => [...sessions, newSession]);
        updateSavedSessions([...sessions, newSession]);
        resolve(newSession);
      } catch {
        reject();
      }
    });
  };
  defaultValue.addLesson = (sessionId, lessonDetail) =>
    new Promise<void>((resolve, reject) => {
      const sessionIndex = sessions.map((x) => x.id).indexOf(sessionId);
      if (sessionIndex === -1)
        reject("Failed to add lesson: Session not found");
      sessions[sessionIndex].lessons = [
        ...sessions[sessionIndex].lessons,
        {
          id: uuidv4(),
          ...lessonDetail,
        },
      ];
      setSessions(sessions);
      updateSavedSessions(sessions);
      resolve();
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
