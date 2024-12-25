"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { TodoModel } from " <prefix>/models/todos.model";


export default function Home() {
  const [todos, setTodos] = useState<TodoModel[] | null>(null);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, completed: false }),
    });
    setTitle("");
  };

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/todos`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };

  const handleUpdate = async (id: string, data: TodoModel) => {

    const { completed } = data;
    console.log(completed);

    await fetch(`/api/todos`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed: !completed }),
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.todoForm}>
        <h1 className="title">Add New Todo</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New Todo"
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
      <div className={styles.todocard}>
        <h1 style={{ textAlign: "center" }}>Todo List</h1>
        <ul>
          {todos?.map((todo: TodoModel) => (
            <li key={todo._id}>
              {todo?.title} - {todo.completed ? "Completed" : "Pending"}
              <button onClick={() => handleDelete(todo._id)}>Delete</button>
              <button onClick={() => handleUpdate(todo._id, todo)}>Update</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
