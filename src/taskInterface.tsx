export interface  ITask {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    status: string;
    dueDate: string;
    priority: 'High' | 'Medium' | 'Low';
}