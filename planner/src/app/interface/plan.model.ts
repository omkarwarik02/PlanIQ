export interface Session {
  subject: string;
  duration: string;
  focus: string;
}

export interface DayPlan {
  day: string;
  sessions: Session[];
}
export interface TableRow {
  day: string;
  isFirst: boolean;
  rowspan: number;
  subject: string;
  duration: string;
  focus: string;
}