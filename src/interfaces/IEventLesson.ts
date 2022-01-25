export interface IAddEventLesson {
  type: "onsite" | "online";
  name: string;
  required: boolean;
  previewable: boolean;
  schedule: Date;
  duration: number;
}

export interface IEventLesson extends IAddEventLesson {
  id: string;
}
