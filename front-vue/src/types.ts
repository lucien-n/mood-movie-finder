export enum TodoFilter {
  All = "All",
  Active = "Active",
  Completed = "Completed",
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
