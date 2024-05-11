export interface Task {
  id?: number;
  title: string;
  summary: string;
  completed: boolean;
}

export interface AddModalProps {
  opened: boolean;
  close: () => void;
  onAdd: (task: Task) => void;
  error: {
    title: boolean;
  };
}

export interface TaskCardProps {
    index: number;
    task: Task;
    onDelete: (index: number) => void;
    onComplete: (task: Task) => void;
  }
