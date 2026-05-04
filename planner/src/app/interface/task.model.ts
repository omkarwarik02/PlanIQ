export interface Task {
    title:string;
    duration:string;
    type:string;
    isCompleted:boolean;
}

export interface TasksBySubject{
    subject:string;
    tasks: Task[];
}