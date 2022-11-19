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
    setTaskName("");
    setTasks((old) => [...old, task]);
  };

  const removeTask = (id: number) => {
    setTasks((old) => old.filter((task) => task.id !== id));
  };

  return (
    <>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
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
          type="submit"
          onClick={() => {
            addTask(taskName);
          }}
        >
          Add Task
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ display: "flex" }}>
            <div>{task.name}</div>
            <button
              type="button"
              onClick={() => {
                removeTask(task.id);
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
