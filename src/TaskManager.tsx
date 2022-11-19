import { useState, useEffect } from "react";

type Task = {
  id: number;
  name: string;
  completed: boolean;
};

export const TaskManager = () => {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fn = async () => {
      const response = await fetch(
        "https://api-bootcamp-production.up.railway.app/tasks"
      );
      const data = await response.json();
      setTasks(data);
    };
    fn();
  }, []);

  const addTask = async (name: string) => {
    const task: Omit<Task, "id"> = {
      name,
      completed: false,
    };
    const response = await fetch(
      "https://api-bootcamp-production.up.railway.app/tasks",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
    const data = await response.json();
    setTaskName("");
    setTasks((old) => [...old, { ...task, id: data.id }]);
  };

  const removeTask = async (id: number) => {
    await fetch("https://api-bootcamp-production.up.railway.app/tasks/" + id, {
      method: "delete",
    });
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
            <div>
              {task.id} - {task.name}
            </div>
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
