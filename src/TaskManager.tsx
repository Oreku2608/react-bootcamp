import { useState } from "react";

type Task = {
  id: number;
  name: string;
  completed: boolean;
};

export const TaskManager = () => {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (name: string) => {
    const task: Task = {
      id: tasks.length + 1,
      name,
      completed: false,
    };
    setTasks((old) => [...old, task]);
  };

  return (
    <>
      <code>{JSON.stringify(tasks)}</code>
      <input
        value={taskName}
        onChange={(ev) => {
          const { value } = ev.target;
          setTaskName(value);
        }}
        type="text"
        placeholder="Task Name ..."
      />
      <button
        onClick={() => {
          addTask(taskName);
        }}
      >
        Add Task
      </button>
    </>
  );
};
