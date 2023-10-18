import React from "react";
import Todo from "./Todo";
import { Container, Typography } from "@mui/material";
import delTodo from "../functions/deleteTodo";
import updateTask from "../functions/update";

export default function DisplayTodos({ todos, setTodos, type, id }) {
  function deleteTodo(id) {
    delTodo(id);
    const updatedTodo = todos.filter((element) => element.id !== id);
    setTodos(updatedTodo);
  }

  function setCompletion(id) {
    const updatedTodos = todos.map((element) => {
      if (element.id === id) {
        updateTask("task", id, !element.completed);
        return { ...element, completed: !element.completed };
      } else {
        return element;
      }
    });
    setTodos(updatedTodos);
  }

  return (
    <Container sx={{ xs: { width: "400px" }, md: { width: "400px" } }}>
      <Typography>{type === "todo" ? "A faire" : "Terminées"}</Typography>
      {type === "todo"
        ? todos.map(
            (todo) =>
              todo.completed === false && (
                <Todo
                  key={todo.id}
                  todo={todo}
                  setCompletion={setCompletion}
                  deleteTodo={deleteTodo}
                />
              )
          )
        : todos.map(
            (todo) =>
              todo.completed === true && (
                <Todo
                  key={todo.id}
                  todo={todo}
                  setCompletion={setCompletion}
                  deleteTodo={deleteTodo}
                />
              )
          )}
    </Container>
  );
}
