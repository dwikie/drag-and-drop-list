export interface ILesson {
  id: string;
  type?: "onsite" | "online" | undefined;
  name?: string;
  required?: boolean;
  previewable?: boolean;
  downloadable?: boolean;
  schedule?: Date | null;
  duration?: number; // in minutes
}

export interface ISession {
  id: string;
  name: string;
  lessons: ILesson[] | [];
}
